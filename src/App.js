import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./paginas/auth/login";
import RegistroPaciente from './paginas/auth/RegistroPaciente';
import Dashboard from "./paginas/auth/dashboard";
import Especialidades from "./paginas/auth/especialidades";
import ListarDoctor from "./paginas/Doctores/ListarDoctor";
import Agenda from "./paginas/auth/agenda";
import RegistroDoctor from "./paginas/Doctores/RegistroDoctor";
import EditarPaciente from "./paginas/Pacientes/EditarPaciente";
import EditarDoctor from "./paginas/Doctores/EditarDoctor";
import ListarPaciente from "./paginas/Pacientes/ListarPaciente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/registroPaciente" exact element={<RegistroPaciente />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/especialidades" exact element={<Especialidades />} />
        <Route path="/agenda" exact element={<Agenda />} />
        <Route path='/ListarDoctor' element={<ListarDoctor />}></Route>
        <Route path='/RegistroDoctor' exact element={<RegistroDoctor />}></Route>
        <Route path="/EditarPaciente/:id" exact element={<EditarPaciente />} />
        <Route path="/EditarDoctor/:id" element={<EditarDoctor />} />
        <Route path="/ListarPaciente" element={<ListarPaciente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
