import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const RegistrarDoctores = () => {
    const [Doctores, setDoctores] = useState({
        Nombre_Apellido: '',
        TipoDocumento: '',
        Identificacion: '',
        Especialidad: '',
        clave: '',
        confirmar: ''
    })
    const { Nombre_Apellido, TipoDocumento, Identificacion, Especialidad, clave, confirmar } = Doctores;

    const onChange = (e) => {
        setDoctores({
            ...Doctores,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("Nombre_Apellido").focus();
    }, [])

    const registrarPacientes = async () => {
        const verificarExistenciaUsuario = async (Identificacion) => {
            try {
                const response = await APIInvoke.invokeGET(
                    `/Doctor?Identificacion=${Identificacion}`
                );
                if (response && response.length > 0) {
                    return true; // El usuario ya existe
                } else {
                    return false; // El usuario no existe
                }

            } catch (error) {
                console.error(error);
                return false; // Maneja el error si la solicitud falla 
            }
        };

        if (clave !== confirmar) {
            const msg = "Las contraseñas no coinciden.";
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
        } else if (clave.length < 6) {
            const msg = "Contraseña demasiado corta (debe ser mayor a 6 caracteres)";
            swal({
                title: 'Error',
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
            const usuarioExistente = await verificarExistenciaUsuario(Identificacion);
            const data = {
                Nombre_Apellido: Doctores.Nombre_Apellido,
                TipoDocumento: Doctores.TipoDocumento,
                Identificacion: Doctores.Identificacion,
                Especialidad: Doctores.Especialidad,
                Telefono: Doctores.Telefono,
                clave: Doctores.clave,
            }
            const response = await APIInvoke.invokePOST(`/Doctor`, data);
            const mensaje = response.msg;

            if (usuarioExistente) {
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

                setDoctores({
                    Nombre_Apellido: '',
                    TipoDocumento: '',
                    Identificacion: '',
                    Especialidad: '',
                    Telefono: '',
                    clave: '',
                })
            }
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        registrarPacientes();
    }

    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <b className="nav-link" data-widget="pushmenu" role="button">
                                <i className="fas fa-bars" />
                            </b>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <b className="nav-link"> Menú</b>
                        </li>
                    </ul>
                </nav>

                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <b className="brand-link">
                        <span className="brand-text font-weight-light">
                            Tu Doctor Online
                        </span>
                    </b>

                    <div className="sidebar">
                        <nav className="mt-2">
                            <ul
                                className="nav nav-pills nav-sidebar flex-column"
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false"
                            >
                                <li className="nav-item">
                                    <Link to={"/dashboard"} className="nav-link">
                                        Inicio
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/especialidades"} className="nav-link">
                                        Especialidades
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Cerrar Sesión
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>

                <div className="hold-transition register-page">
                    <div className="register-box">
                        <div className="card">
                            <div className="card-body register-card-body">
                                <p className="login-box-msg">Registro de Doctores</p>
                                <form onSubmit={onSubmit}>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Nombre_Apellido"
                                            name="Nombre_Apellido"
                                            placeholder="Nombre Doctor"
                                            value={Nombre_Apellido}
                                            onChange={onChange}
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa-solid fa-user-doctor" />                                               
                                                </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type='text'
                                            className="form-control"
                                            id="Especialidad"
                                            name="Especialidad"
                                            placeholder="Especialidad"
                                            value={Especialidad}
                                            onChange={onChange}
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa-solid fa-user-tie" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <select className="form-control"
                                            name="TipoDocumento"
                                            value={TipoDocumento}
                                            onChange={onChange}
                                        >
                                            <option value="">Seleccione un tipo de documento</option>
                                            <option value="CedulaCiudadania">Cédula de Ciudadania</option>
                                            <option value="TarjetaIdentidad">Tarjeta de Identidad</option>
                                            <option value="RegistroCivil">Registro Civil</option>
                                        </select>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa-regular fa-address-card" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="identificacion"
                                            id="Identificacion"
                                            name="Identificacion"
                                            value={Identificacion}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Contraseña"
                                            id="clave"
                                            name="clave"
                                            value={clave}
                                            onChange={onChange}

                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirmar"
                                            id="confirmar"
                                            value={confirmar}
                                            onChange={onChange}
                                            placeholder="Repita su contraseña"

                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success mt-3">
                                        Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="main-footer">
                    <div className="float-right d-none d-sm-block">
                        <b>Version</b> 1.0
                    </div>
                    <strong>Tu Doctor Online © 2014-2021.</strong> Derechos reservados.
                </footer>
            </div>
        </div>
    );
};

export default RegistrarDoctores;
