import Config from "./Config";
import { delay } from "./Utils";

export async function getAllGraphsByUserId(botId) {
    // Backend will need to retrieve userId based on botId that is passed through a header
    const result = await fetch(Config.BackendGraphsURL+"/botId/"+botId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getGraphById(graphId) {
    const result = await fetch(Config.BackendGraphsURL+"/"+graphId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getGraphByUserIdAndType(botId, type) {
    const result = await fetch(Config.BackendGraphsURL+"/specific?botId="+botId+"&type="+type)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    return result;
}

export async function deleteGraphByUserIdAndType(botId, type) {
    await fetch(Config.BackendGraphsURL+"/specific?botId="+botId+"&type="+type, {method: 'DELETE'})
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

export async function getAllDesiredGraphsByUserId(botId) {
    // Backend will need to retrieve userId based on botId that is passed through a header
    const result = await fetch(Config.BackendDesiredGraphsURL+"/botId/"+botId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function deleteDesiredGraph(desiredGraphId) {
    await fetch(Config.BackendDesiredGraphsURL+"/"+desiredGraphId, {method: 'DELETE'})
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
        body: desiredGraphBody
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
        body: desiredGraphBody
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
    await fetch(Config.OnDemandGraphsURL+"/specific?botId="+botId+"&type="+type, {method: 'POST'})
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
    while(newLastUpdated === refLastUpdated) {
        await delay(time);
        time = time * 2;
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
    while(newGraphResponse == null) {
        await delay(time);
        time = time * 2;
        newGraphResponse = await getGraphByUserIdAndType(botId, type);
    }
    return newGraphResponse;
}

export async function loginToNotionWithCode(code) {
    const result = await fetch(Config.NotionGraphsAuthURL+"/login/"+code, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json()
    });
    return result;
}