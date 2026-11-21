import { useState } from "react";

function FormularioPelicula({ onPeliculaRegistrada }) {

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const datos = new FormData();

        datos.append("titulo", titulo);
        datos.append("genero", genero);
        datos.append("descripcion", descripcion);
        datos.append("imagen", imagen);

        try {
            await onPeliculaRegistrada(datos);

            setTitulo("");
            setGenero("");
            setDescripcion("");
            setImagen(null);

            e.target.reset();

            alert("Película registrada correctamente");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="formulario-pelicula">
            <h2>Registrar película</h2>

            <form onSubmit={manejarEnvio}>

                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Género"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                    required
                />

                <button type="submit">
                    Registrar película
                </button>

            </form>
        </div>
    );
}

export default FormularioPelicula;
