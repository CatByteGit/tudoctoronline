import React, { useState } from "react";

function Login() {
const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados al Dashboard:", formData);
    // Aquí puedes enviar los datos a tu Dashboard o cualquier otro lugar necesario
};

return (
    <div className="login-box">
    <div className="login-logo">
        <b>Iniciar Sesión</b>
    </div>
    <div className="card">
        <div className="card-body login-card-body">
        <p className="login-box-msg">Bienvenido, ingrese sus credenciales</p>
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
            <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <div className="input-group-append">
                <div className="input-group-text">
                <span className="fas fa-envelope" />
                </div>
            </div>
            </div>
            <div className="input-group mb-3">
            <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <div className="input-group-append">
                <div className="input-group-text">
                <span className="fas fa-lock" />
                </div>
            </div>
            </div>
            <div className="social-auth-links text-center mb-3">
            <button type="submit" className="btn btn-block btn-primary">
                Ingresar
            </button>
            </div>
        </form>
        </div>
    </div>
    </div>
);
}

export default Login;
