function DetallePelicula({ pelicula, onCerrar }) {

    return (
        <div className="detalle-overlay">

            <div className="detalle-contenedor">

                <button
                    className="detalle-cerrar"
                    onClick={onCerrar}
                >
                    X
                </button>

                <img
                    src={`data:image/png;base64,${pelicula.imagen}`}
                    alt={pelicula.titulo}
                />

                <div className="detalle-info">

                    <h2>{pelicula.titulo}</h2>

                    <p>
                        <strong>Género:</strong> {pelicula.genero}
                    </p>

                    <p>
                        <strong>Descripción:</strong>
                    </p>

                    <p>{pelicula.descripcion}</p>

                </div>

            </div>

        </div>
    );
}

export default DetallePelicula;
