import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Agenda = () => {
  const url = "http://localhost:4000/Agenda";
  const [showAgendarForm, setShowAgendarForm] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  const [Agenda, setAgenda] = useState([]);
  const [FechaCita, setFechaCita] = useState("");
  const [HoraCita, setHoraCita] = useState("");
  const [NombreDoctor, setNombreDoctor] = useState("");
  const [Lugar, setLugar] = useState("");
  const [Especialidad, setEspecialidad] = useState("");

  useEffect(() => {
    getAgenda();
  }, []);

  const getAgenda = async () => {
    try {
      const response = await axios.get(url);
      setAgenda(response.data);
    } catch (error) {
      console.error("Error al obtener agendas:", error);
    }
  };

  const handleAgendarCitaClick = (agendaItem) => {
    setSelectedAgenda(agendaItem);
    setShowAgendarForm(true);
  };

  const handleAgendarCita = async (event) => {
    event.preventDefault();

    const nuevaCita = {
      FechaCita,
      HoraCita,
      NombreDoctor,
      Lugar,
      Especialidad,
    };

    try {
      const response = await axios.post(`${url}/Citas`, nuevaCita);

      if (response.status === 200) {
        alert("Cita agendada con éxito");
        setShowAgendarForm(false);

        // Actualiza la lista de agendas disponibles
        const updatedAgendas = Agenda.filter(
          (item) => item.id !== selectedAgenda.id
        );
        setAgenda(updatedAgendas);

        // Reinicia los campos del formulario
        setFechaCita("");
        setHoraCita("");
        setNombreDoctor("");
        setLugar("");
        setEspecialidad("");
      } else {
        alert("Hubo un error al agendar la cita.");
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      alert("Hubo un error al agendar la cita.");
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
                  <Link to="/perfil" class="nav-link">
                    Perfil
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Agendas Disponibles</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            {Agenda.map((agenda) => (
              <div className="card" key={agenda.id}>
                <div className="card-body">
                  <p>
                    Fecha: {agenda.FechaCita}
                    <br></br>
                    Hora: {agenda.HoraCita}
                    <br></br>
                    Médico:{agenda.NombreDoctor}
                    <br></br>
                    Lugar: {agenda.Lugar}
                    <br></br>
                    Especialidad: {agenda.Especialidad}
                  </p>
                  <button
                    onClick={() => handleAgendarCitaClick(agenda)}
                    className="btn btn-primary"
                  >
                    Agendar Cita
                  </button>
                </div>
              </div>
            ))}

            {showAgendarForm && (
              <div className="card mt-3">
                <div className="card-header">Agendar Cita</div>
                <div className="card-body">
                  <form onSubmit={handleAgendarCita}>
                    <div className="form-group">
                      <label htmlFor="Fecha">Fecha:</label>
                      <input
                        type="date"
                        id="Fecha"
                        name="Fecha"
                        className="form-control"
                        value={FechaCita}
                        onChange={(e) => setFechaCita(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Hora">Hora:</label>
                      <input
                        type="Time"
                        id="Hora"
                        name="Hora"
                        className="form-control"
                        value={HoraCita}
                        onChange={(e) => setHoraCita(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Doctor">Doctor:</label>
                      <input
                        type="text"
                        id="Doctor"
                        name="Doctor"
                        className="form-control"
                        value={NombreDoctor}
                        onChange={(e) => setNombreDoctor(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Lugar">Lugar:</label>
                      <input
                        type="text"
                        id="Lugar"
                        name="Lugar"
                        className="form-control"
                        value={Lugar}
                        onChange={(e) => setLugar(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Especialidad">Especialidad:</label>
                      <input
                        type="text"
                        id="Especialidad"
                        name="Especialidad"
                        className="form-control"
                        value={Especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-success">
                      Agendar
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
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
export default Agenda;
