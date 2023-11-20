import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { show_alerta } from "../../functions";
import { Link } from "react-router-dom";

const EditarPaciente = () => {
  const { id } = useParams(); // Obtiene el parámetro de la URL (el ID del doctor a editar)
  const navigate = useNavigate();
  const url = `http://localhost:4000/Paciente/${id}`;

  const [Paciente, setPaciente] = useState({
    TipoDocumento: "",
    Identificacion: "",
    Nombre_Apellido: "",
    FechaNaciPaci: "",
    Telefono: "",
    Clave: "",
  });

  useEffect(() => {
    getPaciente();
  }, []);

  const getPaciente = async () => {
    try {
      const response = await axios.get(url);
      setPaciente(response.data);
    } catch (error) {
      console.error("Error al obtener detalles del doctor:", error);
      show_alerta("Error", "Hubo un error al obtener los detalles del doctor");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente({
      ...Paciente,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(url, Paciente);
      show_alerta("Éxito", "Detalles del usuario actualizados correctamente");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error al actualizar detalles del usuario:", error);
      show_alerta("Error", "Hubo un error al actualizar los detalles del usuario");
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
            <p className="login-box-msg">Registro de pacientes</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  id="Nombre_Apellido"
                  name="Nombre_Apellido"
                  value={Paciente.Nombre_Apellido}
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
                  <select className="form-control"
                    name="TipoDocumento"
                    value={Paciente.TipoDocumento}
                    onChange={handleInputChange}
                    required
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
                  value={Paciente.Identificacion}
                  onChange={handleInputChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-address-card" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Fecha Nacimiento"
                  id="FechaNaciPaci"
                  name="FechaNaciPaci"
                  value={Paciente.FechaNaciPaci}
                  onChange={handleInputChange}
                  required
                />

                
              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Telefono"
                  id="Telefono"
                  name="Telefono"
                  value={Paciente.Telefono}
                  onChange={handleInputChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-mobile-retro" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={Paciente.Clave}
                  onChange={handleInputChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
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

export default EditarPaciente;
