import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CrearCuenta = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        numIdentificacionPa: '',
        email: '',
        numero: '',
        epsPa: '',
        password: '',
        confirmar: ''
    })
    const { nombre, numIdentificacionPa, email, numero, epsPa, password, confirmar } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const crearcuenta = async () => {
        if (password !== confirmar) {
            const msg = "Contraseñas no coinciden.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirmar: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else if (password.length < 6) {
            const msg = "Contraseña demasiado corta (mayor a 6 caracteres.).";
            swal({
                title: 'Cuidado',
                text: msg,
                icon: 'warning',
                buttons: {
                    confirmar: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            const data = {
                nombre: usuario.nombre,
                numIdentificacionPa: usuario.numIdentificacionPa,
                email: usuario.email,
                numero: usuario.numero,
                epsPa: usuario.epsPa,
                password: usuario.password,
            }
            const response = await APIInvoke.invokePOST(`/Usuarios`, data);
            console.log(response);
            console.log(data);
            const mensaje = response.msg;

            if (mensaje === 'El usuario ya existe') {
                const msg = "El usuario ya existe.";
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'info',
                    buttons: {
                        confirmar: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            } else {
                const msg = "El usuario fue creado correctamente.";
                swal({
                    title: 'Bienvenido',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirmar: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });

                setUsuario({
                    nombre: '',
                    numIdentificacionPa: '',
                    email: '',
                    numero: '',
                    epsPa: '',
                    password: '',
                })
            }
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        crearcuenta();
    }

    return (

        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="register-logo">
                    <Link to={"#"}><b>Crear Cuenta</b></Link>
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Crear tu nuevo usuario, ¡ahora!</p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    name="nombre"
                                    id="nombre"
                                    placeholder="Nombre completo"
                                    value={nombre}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="numIdentificacionPa"
                                    id="numIdentificacionPa"
                                    placeholder="Numero de identificacion"
                                    value={numIdentificacionPa}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Correo electronico"
                                    value={email}
                                    onChange={onChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="numero"
                                    id="numero"
                                    placeholder="Numero de telefono"
                                    value={numero}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    name="epsPa"
                                    id="epsPa"
                                    placeholder="Eps a la que esta afiliado"
                                    value={epsPa}
                                    onChange={onChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={onChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control"
                                    name="confirmar"
                                    id="confirmar"
                                    value={confirmar}
                                    onChange={onChange}
                                    placeholder="Repita su contraseña" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center">

                                <button type="submit" to={"#"} className="btn btn-block btn-primary">

                                    Crear Cuenta
                                </button>
                                <Link to={"/"} className="btn btn-block btn-danger">

                                    Iniciar Sesion
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>


        </div>);
}

export default CrearCuenta;