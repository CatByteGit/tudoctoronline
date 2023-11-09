import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Auth/login';
import CrearCuenta from '../Pages/Auth/CrearCuenta';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
        <Route path='/' element = {<Login />}/>
        <Route path='/crear' element = {<CrearCuenta />}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;