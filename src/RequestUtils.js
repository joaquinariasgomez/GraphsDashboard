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