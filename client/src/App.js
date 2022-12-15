import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Main';
import BuildWrkBnch from './pages/Workbench_build';
import Login from './components/Login';
import Signup from './components/Signup';
import Projects from './pages/Projects';
import Download from './pages/Download_build';
import Header from './components/Header';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Auth from './utils/auth'
import { findAllProjects } from './utils/api';


function App() {
	const [projects, setProjects] = useState([]);
  useEffect(() => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		if (!token) {
			return false;
		}
		const getUserBuilds = async () => {
			try {
				const response = await findAllProjects(token);
				if (!response.ok) {
					throw new Error('something went wrong!');
				}
				const user = await response.json();
				setProjects(user.builds);
			} catch (err) {
				console.error(err);
			}
		};
		getUserBuilds();
	}, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <>
        <Header/>
          {/* <Navbar /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/wrk' element={<BuildWrkBnch />} />
            <Route path='/Projects' element={<Projects projects= {projects} />} />
            <Route path='/export' element={<Download projects= {projects}/>} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </DndProvider>
  );
}

export default App;
