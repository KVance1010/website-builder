import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuildWrkBnch from './pages/Build_workbench';
import Login from './components/Login';
import Signup from './components/Signup';
import Projects from './pages/Projects';
import Download  from './pages/Download_build';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <>
        {/* <Navbar /> */}
       <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/wrk' element={<BuildWrkBnch />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/export' element={<Download />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
