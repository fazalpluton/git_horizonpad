import { useState } from 'react';
import './assets/css/style.css'
import './assets/css/responsive.css';
import Header from './components/Header';
import DashboardHeader from './components/DashboadHeader';
import Footer from './components/Footer';
import Home from './screens/Home'
import IdoProjects from './screens/Ido_projects'
import HciProjects from "./screens/Hci_projects"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Burgeon from './screens/Burgeon';
import NFTMarket from './screens/NFTMarket';
import P2P from './screens/P2P';
import B2B from './screens/B2B';
import Stacking from './screens/Staking';
import UnStacking from './screens/Unstaking';
import Withdraw from './screens/Withdraw';
import ProjectDetails from './screens/Projectdetails';
import Login from './screens/admin/Login';
import Projects from './screens/admin/Project';
import AddProject from './screens/admin/AddProject';
import UpdateProject from './screens/admin/Update';
import AddProjectDetail from './screens/admin/AddDetail';
// import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';



function App() {

  const [errorMessage, setErrorMessage] = useState();
  useEagerConnect(setErrorMessage);
  useInactiveListener();

  console.log("errorMessage", errorMessage)

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home header={<Header/>} footer={<Footer/>}/>}  />
        <Route path="/ido-projects" element={<IdoProjects header={<DashboardHeader  setErrorMessage={setErrorMessage}/>} footer={<Footer/>} />}  />
        <Route path="/hci-projects" element={<HciProjects header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/burgeon-projects" element={<Burgeon header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/nft-marketplace" element={<NFTMarket header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/p2p-swap" element={<P2P header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/b2b-market" element={<B2B header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/staking" element={<Stacking header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/unstaking" element={<UnStacking header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/withdraw" element={<Withdraw header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/project-detail/:id" element={<ProjectDetails header={<DashboardHeader/>} footer={<Footer/>}/>}  />

        {/* admin routes  */}
        <Route path="/admin/login" element={<Login header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/admin/projects" element={<Projects header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/admin/add-project" element={<AddProject header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/admin/edit-project/:id"  element={ <UpdateProject header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>}  />
        <Route path="/admin/add-project-detail/:id"  element={ <AddProjectDetail header={<DashboardHeader setErrorMessage={setErrorMessage}/>} footer={<Footer/>}/>} />
        </Routes>
    </Router>
  );
}

export default App;
