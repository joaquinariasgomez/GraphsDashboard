import Config from "./Config";
import { delay } from "./Utils";

export async function getAllGraphsByUserId(botId) {
    // Backend will need to retrieve userId based on botId that is passed through a header
    const result = await fetch(Config.BackendGraphsURL+"/botId/"+botId, 
        {
            referrer: "",
            keepalive: false
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getGraphById(graphId) {
    const result = await fetch(Config.BackendGraphsURL+"/"+graphId,
        {
            referrer: "",
            keepalive: false
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getGraphByUserIdAndType(botId, type) {
    const result = await fetch(Config.BackendGraphsURL+"/specific?botId="+botId+"&type="+type,
        {
            referrer: "",
            keepalive: false
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    return result;
}

export async function deleteGraphByUserIdAndType(botId, type) {
    await fetch(Config.BackendGraphsURL+"/specific?botId="+botId+"&type="+type,
        {
            method: 'DELETE',
            referrer: "",
            keepalive: false
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

export async function getAllDesiredGraphsByUserId(botId) {
    // Backend will need to retrieve userId based on botId that is passed through a header
    const result = await fetch(Config.BackendDesiredGraphsURL+"/botId/"+botId,
        {
            referrer: "",
            keepalive: false
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function deleteDesiredGraph(desiredGraphId) {
    await fetch(Config.BackendDesiredGraphsURL+"/"+desiredGraphId,
        {
            method: 'DELETE',
            referrer: "",
            keepalive: false
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

export async function createDesiredGraph(desiredGraphBody) {
    const result = await fetch(Config.BackendDesiredGraphsURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: desiredGraphBody,
        referrer: "",
        keepalive: false
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json()
    });
    return result;
}

export async function updateDesiredGraph(desiredGraphId, desiredGraphBody) {
    const result = await fetch(Config.BackendDesiredGraphsURL+"/"+desiredGraphId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: desiredGraphBody,
        referrer: "",
        keepalive: false
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json()
    });
    return result;
}

export async function reloadDesiredGraph(botId, type) {
    await fetch(Config.OnDemandGraphsURL+"/specific?botId="+botId+"&type="+type,
        {
            method: 'POST',
            referrer: "",
            keepalive: false
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

export async function reloadDesiredGraphAndReturnUpdatedGraph(botId, type, userGraph) {
    reloadDesiredGraph(botId, type);
    // Ahora, hacer peticiones tipo exponential backoff al back hasta que lastUpdated haya cambiado
    const refLastUpdated = userGraph.lastUpdated;
    let updatedGraphResponse = await getGraphById(userGraph.id);
    let newLastUpdated = updatedGraphResponse.lastUpdated;
    let time = 50;
    let total_time_waited = time;
    const MAX_WAIT_TIME = 20000;    // 20 seconds
    while(newLastUpdated === refLastUpdated) {
        if(total_time_waited > MAX_WAIT_TIME) {
            throw new Error("Error esperando a que se actualice la gráfica. Recarga la página o inténtalo de nuevo.");
        }
        await delay(time);
        if(time < 800) {
            time = time * 2;
        }
        else {
            time = 1000;    // One second as maximum wait time
        }
        total_time_waited = total_time_waited + time;
        updatedGraphResponse = await getGraphById(userGraph.id);
        newLastUpdated = updatedGraphResponse.lastUpdated;
    }
    return updatedGraphResponse;
}

export async function reloadDesiredGraphAndReturnNewGraph(botId, type) {
    reloadDesiredGraph(botId, type);
    // Ahora, hacer peticiones tipo exponential backoff al back hasta que lastUpdated haya cambiado
    let newGraphResponse = await getGraphByUserIdAndType(botId, type);
    let time = 50;
    let total_time_waited = time;
    const MAX_WAIT_TIME = 20000;    // 20 seconds
    while(newGraphResponse == null) {
        if(total_time_waited > MAX_WAIT_TIME) {
            throw new Error("Error esperando a que se actualice la gráfica. Recarga la página o inténtalo de nuevo.");
        }
        await delay(time);
        if(time < 800) {
            time = time * 2;
        }
        else {
            time = 1000;    // One second as maximum wait time
        }
        total_time_waited = total_time_waited + time;
        newGraphResponse = await getGraphByUserIdAndType(botId, type);
    }
    return newGraphResponse;
}

export async function loginToNotionWithCode(code) {
    const result = await fetch(Config.NotionGraphsAuthURL+"/login/"+code, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'testheader': 'adios2'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json()
    });
    return result;
}

// TODO: read docs about headers here: https://javascript.info/fetch-api