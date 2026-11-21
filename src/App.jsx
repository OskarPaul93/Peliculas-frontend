import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import PeliculaCard from "./components/PeliculaCard";
import Login from "./components/Login";
import FormularioPelicula from "./components/FormularioPelicula";
import EditarPelicula from "./components/EditarPelicula";
import DetallePelicula from "./components/DetallePelicula";

import {
    listarPeliculas,
    registrarPelicula,
    actualizarPelicula,
    eliminarPelicula
} from "./services/PeliculaService";

import "./App.css";

function App() {

    const [autenticado, setAutenticado] = useState(
        !!localStorage.getItem("token")
    );

    const [peliculas, setPeliculas] = useState([]);

    const [cargando, setCargando] = useState(
        !!localStorage.getItem("token")
    );

    const [peliculaEditar, setPeliculaEditar] = useState(null);

    const [peliculaDetalle, setPeliculaDetalle] = useState(null);

    // Cargar las películas
    useEffect(() => {

        if (!autenticado) {
            return;
        }

        const cargarPeliculas = async () => {

            try {

                const datos = await listarPeliculas();
                setPeliculas(datos);

            } catch (error) {

                console.error(
                    "No se pudieron cargar las películas:",
                    error instanceof Error ? error.message : error
                );

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

    // Actualizar una película
    const manejarActualizacion = async (id, datos) => {

        const peliculaActualizada = await actualizarPelicula(id, datos);

        setPeliculas((peliculasAnteriores) =>
            peliculasAnteriores.map((pelicula) =>
                pelicula.id === id
                    ? peliculaActualizada
                    : pelicula
            )
        );

        setPeliculaEditar(null);
    };

    // Eliminar una película
    const manejarEliminacion = async (id) => {

        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar esta película?"
        );

        if (!confirmar) {
            return;
        }

        try {

            await eliminarPelicula(id);

            setPeliculas((peliculasAnteriores) =>
                peliculasAnteriores.filter(
                    (pelicula) => pelicula.id !== id
                )
            );

            alert("Película eliminada correctamente");

        } catch (error) {

            alert("No se pudo eliminar la película");
            console.error(error);
        }
    };

    // Cerrar sesión
    const cerrarSesion = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");

        setAutenticado(false);
        setPeliculas([]);
        setPeliculaEditar(null);
        setPeliculaDetalle(null);
    };

    // Mostrar login
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

            {/* Ventana de detalles */}
            {peliculaDetalle && (
                <DetallePelicula
                    pelicula={peliculaDetalle}
                    onCerrar={() => setPeliculaDetalle(null)}
                />
            )}

            <h1>Catálogo de Películas</h1>

            <p>Bienvenido a nuestra aplicación de películas.</p>

            {/* Formulario de registro */}
            {localStorage.getItem("rol") === "ADMIN" && (

                <FormularioPelicula
                    onPeliculaRegistrada={manejarRegistro}
                />

            )}

            {/* Formulario de edición */}
            {peliculaEditar && (

                <EditarPelicula
                    pelicula={peliculaEditar}
                    onActualizar={manejarActualizacion}
                    onCancelar={() => setPeliculaEditar(null)}
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
                            onEditar={() => setPeliculaEditar(pelicula)}
                            onEliminar={() => manejarEliminacion(pelicula.id)}
                            onVerDetalles={() => setPeliculaDetalle(pelicula)}
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
