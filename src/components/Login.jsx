import { useState } from "react";

function Login({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const manejarLogin = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!respuesta.ok) {
                throw new Error("Usuario o contraseña incorrectos");
            }

            const datos = await respuesta.json();

            localStorage.setItem("token", datos.token);
            localStorage.setItem("username", datos.username);
            localStorage.setItem("rol", datos.rol);

            onLogin();

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-container">

            <h2>Iniciar sesión</h2>

            <form onSubmit={manejarLogin}>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Ingresar
                </button>

            </form>

        </div>
    );
}

export default Login;
