import { useState } from 'react';
import './assets/css/style.css'
import './assets/css/responsive.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home'
import IdoProjects from './screens/Ido_projects'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';


function App() {

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home header={<Header/>} footer={<Footer/>}/>}  />
        <Route path="/Ido-Projects" element={<IdoProjects header={<Header/>}/>}  />
        </Routes>
    </Router>
  );
}

export default App;
