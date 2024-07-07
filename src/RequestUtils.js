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

export async function getGraphByUserIdAndDesiredGraphId(botId, desiredGraphId) {
    const result = await fetch(Config.BackendGraphsURL+"/specific?botId="+botId+"&desiredGraphId="+desiredGraphId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    return result;
}

export async function deleteGraphByUserIdAndDesiredGraphId(botId, desiredGraphId) {
    await fetch(Config.BackendGraphsURL+"/specific?botId="+botId+"&desiredGraphId="+desiredGraphId,
        {
            method: 'DELETE'
        })
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

export async function getUsingNotionTemplates(botId) {
    const result = await fetch(Config.NotionGraphsAuthURL+"/has-notion-templates/botId/"+botId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getGraphTypeAccess(botId) {
    const result = await fetch(Config.NotionGraphsAuthURL+"/notion-templates-access/botId/"+botId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getExpensesCategories(botId) {
    const result = await fetch(Config.NotionGraphsAuthURL+"/expenses-categories/botId/"+botId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getIncomesBankAccounts(botId) {
    const result = await fetch(Config.NotionGraphsAuthURL+"/incomes-bankaccounts/botId/"+botId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function getIncomesSources(botId) {
    const result = await fetch(Config.NotionGraphsAuthURL+"/incomes-sources/botId/"+botId)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
    return result;
}

export async function createSessionsSearch(botId) {
    await fetch(Config.NotionGraphsAuthURL+"/sessions-search/botId/"+botId,
        {
            method: 'POST'
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

export async function deleteDesiredGraph(desiredGraphId) {
    await fetch(Config.BackendDesiredGraphsURL+"/"+desiredGraphId,
        {
            method: 'DELETE'
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

export async function reloadDesiredGraph(botId, desiredGraphId) {
    await fetch(Config.OnDemandGraphsURL+"/specific?botId="+botId+"&desiredGraphId="+desiredGraphId,
        {
            method: 'POST'
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

export async function reloadDesiredGraphAndReturnUpdatedGraph(botId, desiredGraphId, userGraph) {
    reloadDesiredGraph(botId, desiredGraphId);
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

export async function reloadDesiredGraphAndReturnNewGraph(botId, desiredGraphId) {
    reloadDesiredGraph(botId, desiredGraphId);
    // Ahora, hacer peticiones tipo exponential backoff al back hasta que lastUpdated haya cambiado
    let newGraphResponse = await getGraphByUserIdAndDesiredGraphId(botId, desiredGraphId);
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
        newGraphResponse = await getGraphByUserIdAndDesiredGraphId(botId, desiredGraphId);
    }
    return newGraphResponse;
}

export async function loginToNotionWithCode(code) {
    const auth_url = Config.NotionGraphsAuthURL+"/login/"+code;
    const result = await fetch(auth_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
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

export async function createStripeCheckoutSession(botId) {
    await fetch(Config.BackendStripeURL+"/checkout-session?botId="+botId,
        {
            method: 'POST',
            // redirect: 'manual'
        })
        .then(response => {
            console.log(response.status);
            if(response.status == "303") {
                console.log("Response is 303")
                console.log("response headers: ",response.headers);
                console.log("response status: ",response.status);
                const location = response.headers.get('Location');
                console.log("Location: ", location);
                // if (location) {
                //     window.location.href = location; // Perform the manual redirect
                // }
                // window.location.href = response.url;
            }
            if(response.redirected) {
                console.log("Response is redirect")
                console.log("response headers: ",response.headers);
                console.log("response status: ",response.status);
                const location = response.headers.get('Location');
                console.log("Location: ", location);
                // if (location) {
                //     window.location.href = location; // Perform the manual redirect
                // }
                // window.location.href = response.url;
            }
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

// TODO: read docs about headers here: https://javascript.info/fetch-api