import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../../functions";

const Dashboard = () => { // Define el componente Dashboard
  const url = 'http://localhost:4000/Citas'; // URL de la API para obtener citas
  const [Citas, setCitas] = useState([]); // Estado para almacenar las citas

  //Obtener las citas desde la api
  useEffect(() => {
    getCitas();
  }, []);

  const getCitas = async () => {
    const respuesta = await axios.get(url);//Realizar solicitudes a la url
    setCitas(respuesta.data);    // Actualiza el estado Citas con los datos recibidos
  }

  // Define la función envarSolicitud para manejar solicitudes DELETE
  const envarSolicitud = async (metodo, id) => {
    try {
      const respuesta = await axios.delete(`${url}/${id}`);
      const tipo = respuesta.data[0];  // Extrae el tipo y mensaje de la respuesta
      const msj = respuesta.data[1];
      show_alerta(msj, tipo);

      if (tipo === 'success') {
        show_alerta('Su cita ha sido cancelada');
        getCitas();
      }
    } catch (error) {
      show_alerta('Error al eliminar la cita');
      console.error(error);
    }
  }

  //  // Función para eliminar citas
  const deleteCitas = async (id) => {
    // Crea una instancia de SweetAlert para mostrar un cuadro de confirmación
    const MySwal = withReactContent(Swal);
    const confirmationResult = await MySwal.fire({
      title: '¿Está seguro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmationResult.isConfirmed) {
      try {
        await envarSolicitud('DELETE', id);
        show_alerta('Cita cancelada exitosamente', 'success');
      } catch (error) {
        show_alerta('No se pudo cancelar la cita', 'error');
      }
    } else {
      show_alerta('cita cancelada');
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
                  <Link to="/detalleagenda" className="nav-link">
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
                          <th style={{ width: '15%' }}>Fecha</th>
                          <th style={{ width: '15%' }}>Hora</th>
                          <th style={{ width: '15%' }}>Lugar</th>
                          <th style={{ width: '20%' }}>Nombre Doctor</th>
                          <th style={{ width: '20%' }}>Especialidad</th>
                          <th style={{ width: '15%' }}>Acción</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {Citas.map((Citas, i) => ( //método para recorrer cada elemento
                          <tr key={Citas.id}>
                            <td>{Citas.FechaCita}</td>
                            <td>{Citas.HoraCita}</td>
                            <td>{Citas.Lugar}</td>
                            <td>{Citas.NombreDoctor}</td>
                            <td>{Citas.Especialidad}</td>
                            <td>
                              <button onClick={() => deleteCitas(Citas.id)}
                                className="btn btn-danger">
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
export default Dashboard;
