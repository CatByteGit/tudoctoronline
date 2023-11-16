import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke.js";
import swal from "sweetalert";

const Login = () => {

    //Este método es para redireccionar un componente a otro
    const navigate = useNavigate();

    //Definir el estado inicial de las variables
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    //En esta linea va el useEffect, no se por que no funciona seguire adelante a ver si me funciona ponerlo después
    useEffect(() => {
        document.getElementById("email").focus();
    }, [])


    const iniciarSesion = async () => {
        const verificarExistenciaUsuario = async (email, password) => {
            try {
                //crear la url para la consulta
                const response = await APIInvoke.invokeGET(
                    `/Usuarios?email=${email}&password=${password}`
                );
                if (response && response.length > 0) {
                    // Devuelve el primer usuario que coincide
                    return response[0]; 
                }
                // El usuario no existe
                return null; 
            } catch (error) {
                // Maneja el error si la solicitud falla
                console.error(error);
                return null; 
            }
        };

        if(password.length < 6){
            const msg = "Contraseña demasiado corta (debe ser mayor a 6 caracteres)";
            swal({
            title: "Error",
            text: msg,
            icon: "error",
            buttons: {
                confirm: {
                text: "Ok",
                value: true,
                visible: true,
                className: "btn btn-danger",
                closeModal: true,
                },
            },
            });
        }else{
            const usuarioExistente = await verificarExistenciaUsuario(email, password);
            const response = await APIInvoke.invokeGET(
                `/Usuarios?email=${email}&password=${password}`
            );

            if (!usuarioExistente) {
                const msg = "No es posible iniciar sesión, verifique los datos";
                new swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            }else{
                //Contenemos el token de acceso
                const jwt = response.token;
                //Guardar el token en el localstorage
                localStorage.setItem('token', jwt);
                //Redireccionamos al home o pagina principal
                navigate("/menu")
            }
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }
return (
    <div className="login-box">
        <div className="login-logo">
            <b>Iniciar Sesión</b>
        </div>
        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">Bienvenido, ingrese sus credenciales</p>
                <form onSubmit={onSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={onChange}
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
                            value={password}
                            onChange={onChange}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                        </div>
                    </div>
                    <div className="social-auth-links text-center mb-3">
                        <Link to={"/crear"} className="btn btn-block btn-primary">
                            Crear cuenta
                        </Link>
                        <button className="btn btn-block btn-danger">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
}

export default Login;
