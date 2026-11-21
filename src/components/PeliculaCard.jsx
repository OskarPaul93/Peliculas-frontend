function PeliculaCard({ pelicula }) {

    return (
        <div className="pelicula-card">

            <img
                src={`data:image/jpeg;base64,${pelicula.imagen}`}
                alt={pelicula.titulo}
            />

            <div className="pelicula-info">

                <h3>{pelicula.titulo}</h3>

                <p>{pelicula.genero}</p>

                <p>{pelicula.descripcion}</p>

                <button>Ver detalles</button>

            </div>

        </div>
    );

}

export default PeliculaCard;