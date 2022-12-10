import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Home from './pages/Home';
import BuildWrkBnch from './pages/Build_workbench';
import Login from './components/Login';
import Signup from './components/Signup';
import Projects from './pages/Projects';
import Download  from './pages/Download_build';
=======
import Home from './pages/home';
import BuildWrkBnch from './pages/build_workbench';
import Login from './components/login';
import Signup from './components/signup';
import Projects from './pages/projects';
>>>>>>> 69264e20056f4590f707af9ad4487c7bb349d5d0

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
          <Route path='/download' element={<Download />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
