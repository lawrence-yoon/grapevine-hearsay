import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Hearsay from './pages/Hearsay';
import Header from './components/Header';

function App() {
  return (
    <>
    <Router>
    <div className='container'>
    <Header/>
    {/* nothing in the routes thats not a route */}
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/public' element={<Hearsay/>}></Route>
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
