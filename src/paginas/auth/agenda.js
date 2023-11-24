import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Agenda = () => {
  const [Agenda, setAgenda] = useState({
    FechaCita: '',
    HoraCita: '',
    Doctor: '',
    Especialidad: '',
  })
  const { FechaCita, HoraCita, Doctor, Especialidad } = Agenda;

  const onChange = (e) => {
    setAgenda({
      ...Agenda,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    document.getElementById("FechaCita").focus();
  }, [])

  const registrarPacientes = async () => {
    const verificarExistenciaUsuario = async (Doctor) => {
      try {
        const response = await APIInvoke.invokeGET(
          `/Doctor?Nombre_Apellido=${Doctor}`
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
    const verificarAgendaExiste = async (FechaCita, HoraCita) => {
      try {
        const response = await APIInvoke.invokeGET(
          `/Agenda?FechaCita=${FechaCita}&&HoraCita=${HoraCita}`
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
    const agendaExiste = await verificarAgendaExiste(FechaCita, HoraCita);

    const usuarioExistente = await verificarExistenciaUsuario(Doctor);
    const data = {
      FechaCita: Agenda.FechaCita,
      HoraCita: Agenda.HoraCita,
      Doctor: Agenda.Doctor,
      Especialidad: Agenda.Especialidad,
    }
    const response = await APIInvoke.invokePOST(`/Agenda`, data);
    const mensaje = response.msg;

    if (usuarioExistente) {
      const msg = "El doctor existe, se ha creado a agenda exitosamente";
      swal({
        title: 'Hecho',
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
      if (agendaExiste) {
        const msg = "La agenda ya existe.";
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
        const msg = "La agenda ha sido creada exitosamente.";
        swal({
          title: 'Hecho',
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
      } 
    }else {
        const msg = "El doctor no existe.";
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

        setAgenda({
          FechaCita: '',
          HoraCita: '',
          Doctor: '',
          Especialidad: '',
        })
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
                  <p className="login-box-msg">Registro de agenda</p>
                  <form onSubmit={onSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="date"
                        className="form-control"
                        id="FechaCita"
                        name="FechaCita"
                        value={FechaCita}
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
                      <input
                        type='text'
                        className="form-control"
                        id="Doctor"
                        name="Doctor"
                        placeholder="Doctor"
                        value={Doctor}
                        onChange={onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fa-solid fa-user-tie" />
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="time"
                        className="form-control"
                        id="HoraCita"
                        name="HoraCita"
                        value={HoraCita}
                        onChange={onChange}
                      />
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

  export default Agenda;
