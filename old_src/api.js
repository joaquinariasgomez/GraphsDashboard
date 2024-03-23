const apiUrl = "http://localhost:8080/api/graphs";

// TODO: en el futuro todas las peticiones serán por userId, en el
// sentido de que se hará a través del token que devuelva el servicio
// de autenticación. El backend cogería ese token y adivinaría el userId
export async function getAllGraphsByUserId(userId) {
    const result = await fetch(apiUrl+"/userId/"+userId)
        .then(response => response.json());
    return result;
}