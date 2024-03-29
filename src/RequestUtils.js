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

export async function reloadDesiredGraph(userId, type) {
    console.log("Type que me llega "+type);
    await fetch(Config.OnDemandGraphsURL+"/specific?userId="+userId+"&type="+type, {method: 'POST'})
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        });
}