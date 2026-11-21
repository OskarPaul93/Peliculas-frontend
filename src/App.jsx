import Navbar from "./components/Navbar";
import PeliculaCard from "./components/PeliculaCard";
function App() {
    const pelicula = {
        titulo: "Interestelar",
        genero: "Ciencia ficción",
        descripcion: "Una aventura a través del espacio.",
        imagen: ""
    };

    return (
        <div>
            <Navbar />

            <h1>Catálogo de Películas</h1>
            <p>Bienvenido a nuestra aplicación de películas.</p>

            <div className="catalogo">
              <PeliculaCard pelicula={pelicula} />
            </div>        
        </div>
    );
}

export default App;