import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { show_alerta } from "../../functions";

const EditarDoctor = () => {
     // Obtiene el parámetro de la URL (el ID del doctor a editar)
    const { id } = useParams();
    const navigate = useNavigate();

     // Estado para almacenar los detalles del doctor
    const url = `http://localhost:4000/Doctor/${id}`;

    const [Doctor, setDoctor] = useState({
        NombreDoctor: "",
        Especialidad: "",
        Correo: "",
    });

    //obtiene los detalles del doctor desde la API
    useEffect(() => {
        getDoctor();
    }, []);

    const getDoctor = async () => {
        try {
            // Realiza una solicitud GET para obtener los detalles del doctor
            const response = await axios.get(url);
             // Actualiza el estado Doctor con los detalles del doctor
            setDoctor(response.data);
        } catch (error) {
            console.error("Error al obtener detalles del doctor:", error);
            show_alerta("Error", "Hubo un error al obtener los detalles del doctor");
        }
    };

    // Maneja cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...Doctor,
            [name]: value,
        });
    };

    // Maneja el envío del formulario para actualizar los detalles del doctor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             // Realiza una solicitud PUT para actualizar los detalles del doctor
            const response = await axios.put(url, Doctor);
            show_alerta("Éxito", "Detalles del doctor actualizados correctamente");
            navigate("/ListarDoctor");
        } catch (error) {
            console.error("Error al actualizar detalles del doctor:", error);
            show_alerta("Error", "Hubo un error al actualizar los detalles del doctor");
        }
    };

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
                        <span className="brand-text font-weight-light">Tu Doctor Online</span>
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
                                <li className="nav-item">
                                    <Link to={"/EditarPaciente"} className="nav-link">
                                        Editar Perfil
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/ListarDoctor"} className="nav-link">
                                        Doctores
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/detalleagenda" className="nav-link">
                                        Detalles de Agenda Médica
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
                                <p className="login-box-msg">Editar Doctor</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre"
                                            id="NombreDoctor"
                                            name="NombreDoctor"
                                            value={Doctor.NombreDoctor}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa-solid fa-signature" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Especialidad"
                                            id="Especialidad"
                                            name="Especialidad"
                                            value={Doctor.Especialidad}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Correo"
                                            id="Correo"
                                            name="Correo"
                                            value={Doctor.Correo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="social-auth-links text-center">
                                        <button type="submit" className="btn btn-primary">
                                            Guardar Cambios
                                        </button>
                                    </div>
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

export default EditarDoctor;
