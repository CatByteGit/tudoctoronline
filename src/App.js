import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/login';

import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element = {<Login/>}/>

        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;