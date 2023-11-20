import React from "react";
import { Link } from "react-router-dom";
const Especialidades = () => {
  return (
    <div classname="hold-transition sidebar-mini">
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
            <span className="brand-text font-weight-light">Bienvenido</span>
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
                <li class="nav-item">
                  <Link to={"/RegistroDoctor"} className="nav-link">Cerrar Sesion</Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <section className="content">
                  <h5 className="mb-2">Especialidades Médicas</h5>

                  <div className="row">
                    <div className="col-md-3">
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Cardiología</h3>

                          <div className="card-tools">
                            <button
                              type="button"
                              className="btn btn-tool"
                              data-card-widget="collapse"
                            >
                              <i className="fas fa-minus" />
                            </button>
                          </div>
                        </div>

                        <div className="card-body">
                          La cardiología es la especialidad médica que se
                          encarga del estudio, diagnóstico y tratamiento de las
                          enfermedades del corazón y del sistema cardiovascular.
                          Los cardiólogos son expertos en evaluar la salud del
                          corazón, realizar pruebas de diagnóstico como
                          electrocardiogramas y ecocardiogramas, y ofrecer
                          tratamientos para afecciones cardíacas como la
                          hipertensión arterial, la insuficiencia cardíaca y los
                          trastornos del ritmo cardíaco.
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="card card-warning">
                        <div className="card-header">
                          <h3 className="card-title">Dermatología</h3>

                          <div className="card-tools">
                            <button
                              type="button"
                              className="btn btn-tool"
                              data-card-widget="collapse"
                            >
                              <i className="fas fa-minus" />
                            </button>
                          </div>
                        </div>

                        <div className="card-body">
                          La dermatología es la especialidad médica dedicada al
                          diagnóstico y tratamiento de las enfermedades de la
                          piel, cabello y uñas. Los dermatólogos son expertos en
                          el manejo de afecciones cutáneas como el acné, el
                          eczema, la psoriasis y el cáncer de piel. Además,
                          realizan procedimientos dermatológicos como la cirugía
                          de piel y el láser para mejorar la salud y apariencia
                          de la piel.
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="card card-danger">
                        <div className="card-header">
                          <h3 className="card-title">Ortopedia</h3>

                          <div className="card-tools">
                            <button
                              type="button"
                              className="btn btn-tool"
                              data-card-widget="collapse"
                            >
                              <i className="fas fa-minus" />
                            </button>
                          </div>
                        </div>

                        <div className="card-body">
                          Trata las afecciones del sistema musculoesquelético,
                          como fracturas óseas y problemas articulares.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <div className="card card-outline card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Neurología</h3>

                          <div className="card-tools">
                            <button
                              type="button"
                              className="btn btn-tool"
                              data-card-widget="collapse"
                            >
                              <i className="fas fa-minus" />
                            </button>
                          </div>
                        </div>

                        <div className="card-body">
                          Se enfoca en el sistema nervioso y trata afecciones
                          como migrañas, epilepsia y enfermedades
                          neuromusculares.
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="card card-outline card-success">
                        <div className="card-header">
                          <h3 className="card-title">Otorrinolaringología </h3>

                          <div className="card-tools">
                            <button
                              type="button"
                              className="btn btn-tool"
                              data-card-widget="collapse"
                            >
                              <i className="fas fa-minus" />
                            </button>
                          </div>
                        </div>

                        <div className="card-body">
                          Trata afecciones del oído, nariz y garganta, como la
                          pérdida de audición y problemas de sinusitis.
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
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

export default Especialidades;
