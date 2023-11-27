import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Agenda = () => {

  const navigate = useNavigate();

  const [Agenda, setAgenda] = useState({
    FechaCita: '',
    HoraCita: '',
    Doctor: '',
    IdentificacionDoc: '',
    Especialidad: '',
    Estado: 'Disponible',
    identificacionPa: '',
    NombrePa: '',
  })
  const [fechaActual, setFechaActual] = useState(new Date());

  const { FechaCita, HoraCita, Doctor, IdentificacionDoc, Especialidad, identificacionPa, NombrePa } = Agenda;

  const onChange = (e) => {
    setAgenda({
      ...Agenda,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    document.getElementById("FechaCita").focus();
  }, [])

  const registrarAgenda = async () => {
    const verificarExistenciaUsuario = async (IdentificacionDoc) => {
      try {
        const response = await APIInvoke.invokeGET(
          `/Doctor?IdentificacionDoc=${IdentificacionDoc}`
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
    if (new Date(FechaCita + 'T' + HoraCita) < fechaActual) {
      // FechaCita y HoraCita son menores que la fecha y hora actuales
      const msg = "La fecha y hora deben ser mayores que la actual.";
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
      return;
    }
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

    const usuarioExistente = await verificarExistenciaUsuario(IdentificacionDoc);
    const data = {
      FechaCita: Agenda.FechaCita,
      HoraCita: Agenda.HoraCita,
      Doctor: Agenda.Doctor,
      IdentificacionDoc: Agenda.IdentificacionDoc,
      Especialidad: Agenda.Especialidad,
      Estado: "Disponible",
      identificacionPa: Agenda.identificacionPa,
      NombrePa: Agenda.NombrePa,
    }
    const response = await APIInvoke.invokePOST(`/Agenda`, data);
    const mensaje = response.msg;

    if (usuarioExistente) {
      const msg = "El doctor existe";
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
        navigate("/detalleagenda")
      }
    } else {
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
        IdentificacionDoc: '',
        Especialidad: '',
        Estado: "Disponible",
        identificacionPa: '',
        NombrePa: '',
      })
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    registrarAgenda();
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
                  <Link to={"/dashboardPaciente"} className="nav-link">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/especialidades"} className="nav-link">
                    Especialidades
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
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-control"
                      name="Especialidad"
                      value={Especialidad}
                      onChange={onChange}
                    >
                      <option value="">Selecione el tipo de consulta</option>
                      <option value="Medicina General">Medicina General</option>
                      <option value="Odontología">Odontología</option>
                      <option value="Ortopedia">Ortopedia</option>
                    </select>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span/>
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-control"
                      name="Doctor"
                      value={Doctor}
                      onChange={onChange}
                    >
                      <option value="">Seleccione el medico</option>
                      <option value="Mario">Mario</option>
                      <option value="Jhoan">Jhoan</option>
                    </select>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span/>
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
                  <div className="input-group mb-3">
                    <input
                      type="Number"
                      className="form-control"
                      id="identificacionPa"
                      name="identificacionPa"
                      value={identificacionPa}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="NombrePa"
                      name="NombrePa"
                      value={NombrePa}
                      onChange={onChange}
                      required
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
