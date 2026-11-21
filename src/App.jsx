import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PeliculaCard from "./components/PeliculaCard";
import Login from "./components/Login";
import { listarPeliculas } from "./services/PeliculaService";
import "./App.css";

function App() {

    // Comprobar si existe un token guardado
    const [autenticado, setAutenticado] = useState(
        !!localStorage.getItem("token")
    );

    // Estado para almacenar las películas
    const [peliculas, setPeliculas] = useState([]);

    // Estado para controlar la carga
    const [cargando, setCargando] = useState(true);

    // Consultar las películas cuando el usuario inicia sesión
    useEffect(() => {

        if (!autenticado) {
            setCargando(false);
            return;
        }

        const cargarPeliculas = async () => {
            try {
                const datos = await listarPeliculas();
                setPeliculas(datos);

            } catch (error) {
                console.error("No se pudieron cargar las películas");

            } finally {
                setCargando(false);
            }
        };

        cargarPeliculas();

    }, [autenticado]);

    // Función para cerrar sesión
    const cerrarSesion = () => {
        localStorage.clear();
        setAutenticado(false);
        setPeliculas([]);
    };

    // Mostrar Login si no existe una sesión
    if (!autenticado) {
        return (
            <Login onLogin={() => setAutenticado(true)} />
        );
    }

    return (
        <div>
            <Navbar onLogout={cerrarSesion} />

            <h1>Catálogo de Películas</h1>
            <p>Bienvenido a nuestra aplicación de películas.</p>

            <div className="catalogo">

                {cargando ? (
                    <p>Cargando películas...</p>
                ) : peliculas.length > 0 ? (
                    peliculas.map((pelicula) => (
                        <PeliculaCard
                            key={pelicula.id}
                            pelicula={pelicula}
                        />
                    ))
                ) : (
                    <p>No hay películas registradas.</p>
                )}

            </div>
        </div>
    );
}

export default App;
