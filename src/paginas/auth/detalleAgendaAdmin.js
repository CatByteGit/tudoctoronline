import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { show_alerta } from "../../functions";

const ListarAgendaAd = () => {
    const url = "http://localhost:4000/Agenda";

    const [Agenda, setAgenda] = useState([]);
    useEffect(() => {
        getAgenda();
    }, []);

    const getAgenda = async () => {
        const respuesta = await axios.get(url);
        setAgenda(respuesta.data);
    }

    // Define la función envarSolicitud para manejar solicitudes DELETE
    const enviarSolicitud = async (metodo, id) => {
        try {
            const respuesta = await axios.delete(`${url}/${id}`); // Envia una solicitud DELETE al servidor
            const tipo = respuesta.data[0];
            const msj = respuesta.data[1];
            show_alerta(msj, tipo);

            if (tipo === 'success') {
                show_alerta('Paciente Eliminado');
                getAgenda();
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
                await enviarSolicitud('DELETE', id);
                show_alerta('La agenda ha sido eliminda exitosamente', 'success');
            } catch (error) {
                show_alerta('No se pudo eliminar la agenda', 'error');
            }
        } else {
            show_alerta('Eliminación de agenda cancelada');
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
                                    <h1>Agenda</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="col-md-3">
                            <Link to={"/agenda"} className="btn btn-primary btn-block mb-3">
                                <b>Agregar Agenda</b>
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
                                                    <th style={{ width: '15%' }}>FechaCita</th>
                                                    <th style={{ width: '15%' }}>Hora </th>
                                                    <th style={{ width: '15%' }}>Doctor</th>
                                                    <th style={{ width: '20%' }}>Especialidad</th>
                                                    <th style={{ width: '20%' }}>Estado</th>
                                                    <th style={{ width: '20%' }}>Identificación Paciente</th>
                                                    <th style={{ width: '20%' }}>NombrePaciente</th>
                                                    <th style={{ width: '15%' }}>Editar</th>
                                                    <th style={{ width: '15%' }}>Borrar</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {Agenda.map((Agenda, i) => (
                                                    <tr key={Agenda.id}>
                                                        <td>{(i + 1)}</td>
                                                        <td>{Agenda.FechaCita}</td>
                                                        <td>{Agenda.HoraCita}</td>
                                                        <td>{Agenda.Doctor}</td>
                                                        <td>{Agenda.Especialidad}</td>
                                                        <td>{Agenda.Estado}</td>
                                                        <td>{Agenda.identificacionPa}</td>
                                                        <td>{Agenda.NombrePa}</td>
                                                        <td>
                                                            <Link to={`/editarAgenda/${Agenda.id}`} className='btn btn-warning'>Editar</Link>
                                                            &nbsp;
                                                        </td><td><button onClick={() => deletePaciente(Agenda.id)}
                                                            className="btn btn-danger" >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button></td>

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
export default ListarAgendaAd;
