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

// Registrar una película
export const registrarPelicula = async (pelicula) => {
    const TOKEN = localStorage.getItem("token");

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        },
        body: pelicula
    });

    if (!respuesta.ok) {
        throw new Error("Error al registrar la película");
    }

    return await respuesta.json();
};
