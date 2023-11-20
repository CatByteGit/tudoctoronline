import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { show_alerta } from "../../functions";

const ListarPaciente = () => {
    const url = "http://localhost:4000/Pacientes";

    const [Paciente, setPaciente] = useState([]);
    useEffect(() => {
        getPaciente();
    }, []);

    const getPaciente = async () => {
        const respuesta = await axios.get(url);
        setPaciente(respuesta.data);
    }

    // Define la función envarSolicitud para manejar solicitudes DELETE
    const envarSolicitud = async (metodo, id) => {
        try {
            const respuesta = await axios.delete(`${url}/${id}`); // Envia una solicitud DELETE al servidor
            const tipo = respuesta.data[0];
            const msj = respuesta.data[1];
            show_alerta(msj, tipo);

            if (tipo === 'success') {
                show_alerta('Paciente Eliminado');
                getPaciente();
            }
        } catch (error) {
            show_alerta('Error al eliminar Paciente');
            console.error(error);
        }
    }

    // ELIMINAR
    const deletePaciente = async (id) => {
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
                                    <Link to={"/login"} className="nav-link">
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
                                    <h1>Pacientes</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="col-md-3">
                            <Link to={"/RegistroPaciente"} className="btn btn-primary btn-block mb-3">
                                <b>Agregar Paciente</b>
                            </Link>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <div className="card card-primary card-outline">
                                    <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '15%' }}>N°</th>
                                                    <th style={{ width: '15%' }}>TipoDocumento</th>
                                                    <th style={{ width: '15%' }}>Identificacion</th>
                                                    <th style={{ width: '15%' }}>Nombre_Apellido</th>
                                                    <th style={{ width: '20%' }}>FechaNaciPaci</th>
                                                    <th style={{ width: '20%' }}>Telefono</th>
                                                    <th style={{ width: '15%' }}>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {Paciente.map((Paciente, i) => (
                                                    <tr key={Paciente.id}>
                                                        <td>{(i + 1)}</td>
                                                        <td>{Paciente.TipoDocumento}</td>
                                                        <td>{Paciente.Identificacion}</td>
                                                        <td>{Paciente.Nombre_Apellido}</td>
                                                        <td>{Paciente.FechaNaciPaci}</td>
                                                        <td>{Paciente.Telefono}</td>
                                                        <td>
                                                            <Link to={`/EditarPaciente/${Paciente.id}`} className='btn btn-warning'>Editar</Link>
                                                            &nbsp;
                                                            <button onClick={() => deletePaciente(Paciente.id)}
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
export default ListarPaciente;
