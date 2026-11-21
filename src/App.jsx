import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import PeliculaCard from "./components/PeliculaCard";
import Login from "./components/Login";
import FormularioPelicula from "./components/FormularioPelicula";

import {
    listarPeliculas,
    registrarPelicula
} from "./services/PeliculaService";

import "./App.css";

function App() {

    const [autenticado, setAutenticado] = useState(
        !!localStorage.getItem("token")
    );

    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Cargar las películas
    useEffect(() => {

        if (!autenticado) {
            setCargando(false);
            return;
        }

        const cargarPeliculas = async () => {

            setCargando(true);

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

    // Registrar una película
    const manejarRegistro = async (datos) => {

        const nuevaPelicula = await registrarPelicula(datos);

        setPeliculas((peliculasAnteriores) => [
            ...peliculasAnteriores,
            nuevaPelicula
        ]);
    };

    // Cerrar sesión
    const cerrarSesion = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");

        setAutenticado(false);
        setPeliculas([]);
    };

    // Mostrar el formulario de login
    if (!autenticado) {
        return (
            <Login
                onLogin={() => setAutenticado(true)}
            />
        );
    }

    return (
        <div>

            <Navbar onLogout={cerrarSesion} />

            <h1>Catálogo de Películas</h1>

            <p>Bienvenido a nuestra aplicación de películas.</p>

            {/* Formulario visible solamente para ADMIN */}
            {localStorage.getItem("rol") === "ADMIN" && (
                <FormularioPelicula
                    onPeliculaRegistrada={manejarRegistro}
                />
            )}

            {/* Catálogo de películas */}
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
