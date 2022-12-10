import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuildWrkBnch from './pages/Build_workbench';
import Login from './components/Login';
import Signup from './components/Signup';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/wrk' element={<BuildWrkBnch />} />
          <Route path='/Projects' element={<Projects />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
