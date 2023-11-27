import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../../functions";
import APIInvoke from "../../utils/APIInvoke";

const Dashboard = () => {
  const [Citas, setCitas] = useState([]);

  const cargarCitas = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Agenda`);
      setCitas(response);
    } catch (error) {
      console.error("Error al cargar las citas: ", error)
    }
  }
  const handleCancelarCita = async (id) => {
    try {
      // Obtener la cita actual
      const citaActual = Citas.find(cita => cita.id === id);
  
      // Crear un objeto con todos los datos existentes, pero con el estado actualizado
      const datosActualizados = {
        ...citaActual,
        Estado: 'Cancelada',
      };
  
      // Hacer la solicitud al servidor para actualizar la cita con los datos actualizados
      await APIInvoke.invokePUT(`/Agenda/${id}`, datosActualizados);
  
      // Recargar la lista de citas después de la actualización
      cargarCitas();
  
      // Mostrar una alerta o mensaje de éxito
      show_alerta('La cita ha sido cancelada correctamente', 'success');
    } catch (error) {
      console.error("Error al cancelar la cita: ", error);
      // Mostrar una alerta o mensaje de error si la solicitud falla
      show_alerta('Error al cancelar la cita. Por favor, inténtelo de nuevo.', 'error');
    }
  }
  const handleAprobarCita = async (id) => {
    try {
      // Obtener la cita actual
      const citaActual = Citas.find(cita => cita.id === id);
  
      // Crear un objeto con todos los datos existentes, pero con el estado actualizado
      const datosActualizados = {
        ...citaActual,
        Estado: 'Aprobada',
      };
  
      // Hacer la solicitud al servidor para actualizar la cita con los datos actualizados
      await APIInvoke.invokePUT(`/Agenda/${id}`, datosActualizados);
  
      // Recargar la lista de citas después de la actualización
      cargarCitas();
  
      // Mostrar una alerta o mensaje de éxito
      show_alerta('La cita ha sido cancelada correctamente', 'success');
    } catch (error) {
      console.error("Error al cancelar la cita: ", error);
      // Mostrar una alerta o mensaje de error si la solicitud falla
      show_alerta('Error al cancelar la cita. Por favor, inténtelo de nuevo.', 'error');
    }
  }

  const handleCitaDisponible = async (id) => {
    try {
      // Obtener la cita actual
      const citaActual = Citas.find(cita => cita.id === id);
  
      // Crear un objeto con todos los datos existentes, pero con el estado actualizado
      const datosActualizados = {
        ...citaActual,
        Estado: 'Disponible',
      };
  
      // Hacer la solicitud al servidor para actualizar la cita con los datos actualizados
      await APIInvoke.invokePUT(`/Agenda/${id}`, datosActualizados);
  
      // Recargar la lista de citas después de la actualización
      cargarCitas();
  
      // Mostrar una alerta o mensaje de éxito
      show_alerta('La cita ha sido cancelada correctamente', 'success');
    } catch (error) {
      console.error("Error al cancelar la cita: ", error);
      // Mostrar una alerta o mensaje de error si la solicitud falla
      show_alerta('Error al cancelar la cita. Por favor, inténtelo de nuevo.', 'error');
    }
  }
  //Obtener las citas desde la api
  useEffect(() => {
    cargarCitas();
  }, []);

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
                  <Link to={"/especialidades"} className="nav-link">
                    Especialidades
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/ListarPaciente"} className="nav-link">
                    Pacientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/ListarDoctor"} className="nav-link">
                    Doctores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/agendaAd" className="nav-link">
                    Detalles de Agenda Médica
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
                  <h1>Agendamiento de servicios</h1>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="col-md-3">
              <Link to={"/agenda"} className="btn btn-primary btn-block mb-3">
                <b>Agendar Citas</b>
              </Link>
            </div>
            <div className="row">
              <div className="col-md">
                <div className="card card-primary card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Sus Proximas Citas</h3>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: '10%' }}>Fecha</th>
                          <th style={{ width: '10%' }}>Hora</th>
                          <th style={{ width: '10%' }}>Doctor</th>
                          <th style={{ width: '10%' }}>Especialidad</th>
                          <th style={{ width: '10%' }}>Estado</th>
                          <th style={{ width: '10%' }}>identificacionPa</th>
                          <th style={{ width: '10%' }}>NombrePa</th>
                          <th style={{ width: '10%' }}>Acción</th>
                          <th style={{ width: '10%' }}>Acción</th>
                          <th style={{ width: '10%' }}>Acción</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {Citas.map((Citas, i) => ( //método para recorrer cada elemento
                          <tr key={Citas.id}>
                            <td>{Citas.FechaCita}</td>
                            <td>{Citas.HoraCita}</td>
                            <td>{Citas.Doctor}</td>
                            <td>{Citas.Especialidad}</td>
                            <td>{Citas.Estado}</td>
                            <td>{Citas.identificacionPa}</td>
                            <td>{Citas.NombrePa}</td>
                            <td>
                              <button
                                className="btn btn-danger">
                                <i onClick={() => handleCancelarCita(Citas.id)}> Cancelar</i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger">
                                <i onClick={() => handleAprobarCita(Citas.id)}> Aprobar</i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger">
                                <i onClick={() => handleCitaDisponible(Citas.id)}> Disponible</i>
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
export default Dashboard;
