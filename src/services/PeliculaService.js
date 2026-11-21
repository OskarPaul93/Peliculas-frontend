const API_URL = "http://localhost:8080/peliculas";

// Pega aquí tu token JWT de administrador
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9wZWxpY3VsYXMiLCJyb2wiOiJBRE1JTiIsImlhdCI6MTc5NTI3MDg5OSwiZXhwIjoxNzk1MjcyNjk5fQ.tNiQcWsNXMXvIOVT7Ziz4q3chLmuQtizMliTDz2S-_Y";

// Obtener todas las películas
export const listarPeliculas = async () => {
    try {
        const respuesta = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });

        if (!respuesta.ok) {
            throw new Error("Error al obtener las películas");
        }

        return await respuesta.json();

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
