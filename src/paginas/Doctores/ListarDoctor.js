import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { show_alerta } from "../../functions";

const ListarDoctor = () => {
    const url = "http://localhost:4000/Doctor";

    const [Doctor, setDoctor] = useState([]);
    useEffect(() => {
        getDoctor();
    }, []);

    const getDoctor = async () => {
        const respuesta = await axios.get(url);
        setDoctor(respuesta.data);
    }

    // Define la función envarSolicitud para manejar solicitudes DELETE
    const envarSolicitud = async (metodo, id) => {
        try {
            const respuesta = await axios.delete(`${url}/${id}`); // Envia una solicitud DELETE al servidor
            const tipo = respuesta.data[0];
            const msj = respuesta.data[1];
            show_alerta(msj, tipo);

            if (tipo === 'success') {
                show_alerta('Doctor Eliminado');
                getDoctor();
            }
        } catch (error) {
            show_alerta('Error al eliminar la cita');
            console.error(error);
        }
    }

    // ELIMINAR
    const deleteDoctor = async (id) => {
        const MySwal = withReactContent(Swal);
        const confirmationResult = await MySwal.fire({
            title: '¿Está seguro de eliminar este usuario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmationResult.isConfirmed) {
            try {
                await envarSolicitud('DELETE', id);
                show_alerta('Usuario eliminado exitosamente', 'success');
            } catch (error) {
                show_alerta('No se pudo eliminar el usuario', 'error');
            }
        } else {
            show_alerta('Eliminación de usuario cancelada');
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
                                <li class="nav-item">
                                    <Link to={"/"} className="nav-link">
                                        Cerrar Sesión
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Doctores</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="col-md-3">
                            <Link to={"/RegistroDoctor"} className="btn btn-primary btn-block mb-3">
                                <b>Agregar Doctor</b>
                            </Link>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <div className="card card-primary card-outline">
                                    <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '15%' }}>id</th>
                                                    <th style={{ width: '15%' }}>Nombre</th>
                                                    <th style={{ width: '15%' }}>Especialidad</th>
                                                    <th style={{ width: '20%' }}>Identificación</th>
                                                    <th style={{ width: '15%' }}>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {Doctor.map((Doctor, i) => (
                                                    <tr key={Doctor.id}>
                                                        <td>{(i + 1)}</td>
                                                        <td>{Doctor.Nombre_Apellido}</td>
                                                        <td>{Doctor.Especialidad}</td>
                                                        <td>{Doctor.Identificacion}</td>
                                                        <td>
                                                            <Link to={`/EditarDoctor/${Doctor.id}`} className='btn btn-warning'>Editar</Link>

                                                            &nbsp;
                                                            <button onClick={() => deleteDoctor(Doctor.id)}
                                                                className="btn btn-danger" >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <footer className="main-footer">
                    <div className="float-right d-none d-sm-block">
                    </div>
                    <strong>Tu Doctor Online © 2014-2021.</strong> Derechos reservados.
                </footer>
            </div>
        </div>
    );
};
export default ListarDoctor;
