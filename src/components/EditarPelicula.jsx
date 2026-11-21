import { useState } from "react";

function EditarPelicula({ pelicula, onActualizar, onCancelar }) {

    const [titulo, setTitulo] = useState(pelicula.titulo);
    const [genero, setGenero] = useState(pelicula.genero);
    const [descripcion, setDescripcion] = useState(pelicula.descripcion);
    const [imagen, setImagen] = useState(null);

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const datos = new FormData();

        datos.append("titulo", titulo);
        datos.append("genero", genero);
        datos.append("descripcion", descripcion);

        if (imagen) {
            datos.append("imagen", imagen);
        }

        try {
            await onActualizar(pelicula.id, datos);

            alert("Película actualizada correctamente");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="formulario-pelicula">

            <h2>Editar película</h2>

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

                <label>Imagen actual:</label>

                <img
                    src={`data:image/png;base64,${pelicula.imagen}`}
                    alt={pelicula.titulo}
                    style={{
                        width: "120px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px"
                    }}
                />

                <label>Seleccionar nueva imagen (opcional):</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                />

                <button type="submit">
                    Guardar cambios
                </button>

                <button
                    type="button"
                    onClick={onCancelar}
                    style={{ backgroundColor: "#64748b" }}
                >
                    Cancelar
                </button>

            </form>

        </div>
    );
}

export default EditarPelicula;
