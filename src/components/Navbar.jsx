function Navbar({ onLogout }) {
    return (
        <nav>
            <h2>MovieApp</h2>

            <div>
                <span>Catálogo</span>
                <span>Iniciar sesión</span>
                <button onClick={onLogout}>
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
