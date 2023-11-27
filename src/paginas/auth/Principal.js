import React from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "../../Principal.css"; // Importar el archivo de estilos externo

const Principal = () => {
    const handleCerrarSesion = () => {
        // Lógica para cerrar la sesión
        // Puedes utilizar localStorage, sessionStorage, o cualquier método de autenticación que estés utilizando.
        swal("Sesión cerrada exitosamente", "¡Hasta pronto!", "success");
    }

    return (
        <div>
            <header>
                <h1>Tu Doctor Online - Consultorio Médico</h1>
            </header>
            <nav>
                <Link to="/Login">Iniciar Sesión</Link>
                <Link to="/" onClick={handleCerrarSesion}>Cerrar Sesión</Link>
            </nav>
            <section>
                <h2>Bienvenido a Tu Doctor Online</h2>
                <p>
                    Tu Doctor Online es el lugar donde puedes encontrar servicios médicos de alta calidad. Nuestro equipo de doctores y profesionales de la salud está aquí para cuidar de ti.
                </p>
                <p>
                    Explora nuestras especialidades, conoce a nuestros doctores, y agenda tus citas médicas de manera conveniente a través de nuestra plataforma en línea.
                </p>
            </section>
            <footer>
                © 2023 Tu Doctor Online. Todos los derechos reservados.
            </footer>
        </div>
    );
}

export default Principal;
