const API_URL = "http://localhost:8080/peliculas";

// Obtener todas las películas
export const listarPeliculas = async () => {
    try {

        // Obtener el token guardado en el navegador
        const TOKEN = localStorage.getItem("token");

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
