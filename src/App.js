import { useState } from 'react';
import './assets/css/style.css'
import './assets/css/responsive.css';
import Header from './components/Header';
import Home from './screens/Home'
import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home header={<Header/>}/>}  />
        </Routes>
    </Router>
  );
}

export default App;
