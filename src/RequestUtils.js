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

export async function fetchUserGraphs() {
    // Get session token from current logged in user

    // Perform request sending that Token
    // Backend then should be able to retrieve the user from the token
    const apiResponse = await getAllGraphsByUserId("joaquin");
    if(apiResponse) {
        console.log("We have a response "+apiResponse);
    }
    else {
        console.log("We dont have a response");
    }
}