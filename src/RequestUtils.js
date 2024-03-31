import Config from "./Config";

export async function getAllGraphsByUserId(userId) {
    const result = await fetch(Config.BackendGraphsURL+"/userId/"+userId)
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

export async function deleteGraphByUserIdAndType(userId, type) {
    await fetch(Config.BackendGraphsURL+"/specific?userId="+userId+"&type="+type, {method: 'DELETE'})
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}

export async function getAllDesiredGraphsByUserId(userId) {
    const result = await fetch(Config.BackendDesiredGraphsURL+"/userId/"+userId)
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

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export async function reloadDesiredGraph(userId, type, userGraph) {
    await fetch(Config.OnDemandGraphsURL+"/specific?userId="+userId+"&type="+type, {method: 'POST'})
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
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