import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke.js";
import swal from "sweetalert";

const Login = () => {

    //Este método es para redireccionar un componente a otro
    const navigate = useNavigate();

    //Definir el estado inicial de las variables
    const [paciente, setPacientes] = useState({
        Identificacion: '',
        Clave: ''
    });

    const { Identificacion, Clave } = paciente;

    const onChange = (e) => {
        setPacientes({
            ...paciente,
            [e.target.name]: e.target.value
        });
    }

    //En esta linea va el useEffect, no se por que no funciona seguire adelante a ver si me funciona ponerlo después
    useEffect(() => {
        document.getElementById("Identificacion").focus();
    }, [])


    const iniciarSesion = async () => {
        const verificarExistenciaPacientes = async (Identificación, Clave) => {
            try {
                //crear la url para la consulta
                const response = await APIInvoke.invokeGET(
                    `/Pacientes?Identificación=${Identificación}&Clave=${Clave}`
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

        if (Clave.length < 6) {
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
        } else {
            const PacientesExistente = await verificarExistenciaPacientes(Identificacion, Clave);
            const response = await APIInvoke.invokeGET(
                `/Pacientes?Identificacion=${Identificacion}&Clave=${Clave}`
            );

            if (!PacientesExistente) {
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
            } else {
                //Contenemos el token de acceso
                const jwt = response.token;
                //Guardar el token en el localstorage
                localStorage.setItem('token', jwt);
                //Redireccionamos al home o pagina principal
                navigate("/dashboard")
            }
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <b>Inicio de sesion</b>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">
                            Bienvenido, por favor ingrese su informacion
                        </p>
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Identificacion"
                                    id='Identificacion'
                                    name="Identificacion"
                                    value={Identificacion}
                                    onChange={onChange}
                                    required
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
                                    id="Clave"
                                    name="Clave"
                                    value={Clave}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center mb-3">
                                <button
                                    to={"#"}
                                    type="submit"
                                    className="btn btn-block btn-primary"
                                >
                                    Ingresar
                                </button>
                                <Link to={"/registroPaciente"} className="btn btn-block btn-danger">
                                    Crear Cuenta
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
