function PeliculaCard({ pelicula, onEditar, onEliminar }) {

    return (
        <div className="pelicula-card">

            <img
                src={`data:image/png;base64,${pelicula.imagen}`}
                alt={pelicula.titulo}
            />

            <div className="pelicula-info">

                <h3>{pelicula.titulo}</h3>

                <p>{pelicula.genero}</p>

                <p>{pelicula.descripcion}</p>

                <button>
                    Ver detalles
                </button>

                {localStorage.getItem("rol") === "ADMIN" && (

                    <div className="acciones-pelicula">

                        <button onClick={onEditar}>
                            Editar
                        </button>

                        <button
                            onClick={onEliminar}
                            className="btn-eliminar"
                        >
                            Eliminar
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default PeliculaCard;
