import React, { useState } from 'react';
import './dashboard.scss';
import DataTable from '../components/DataTable/dataTable';
import { useAuth } from '../AuthContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "@fontsource/roboto/500.css";

interface DashboardProps {
  // You can define props here if needed
}


const Dashboard: React.FC<DashboardProps> = (props) => {
  const [tableKey, setTableKey] = useState<string>("movements");
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    alert("You have been logged out")
    navigate('/login')

  }

  return (
    <div className="site-wrap">
      <nav className="site-nav">
        <div className="name">
          Hi, {user}!
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M11.5,22C11.64,22 11.77,22 11.9,21.96C12.55,21.82 13.09,21.38 13.34,20.78C13.44,20.54 13.5,20.27 13.5,20H9.5A2,2 0 0,0 11.5,22M18,10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18L18,16M19.97,10H21.97C21.82,6.79 20.24,3.97 17.85,2.15L16.42,3.58C18.46,5 19.82,7.35 19.97,10M6.58,3.58L5.15,2.15C2.76,3.97 1.18,6.79 1,10H3C3.18,7.35 4.54,5 6.58,3.58Z"></path>
          </svg>
        </div>

        <div className="note">
          <Button variant="primary" className="logout-button" onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>&nbsp;&nbsp;Logout</Button>
        </div>
      </nav>
      <main>
        <header>
          <h1 className="title">Farm Movements Dashboard</h1>
          <nav className="nav-tabs" id="nav-tabs">
            <a onClick={() => setTableKey("movements")} className={tableKey==="movements" ? "active" : ""}>
              Movements
            </a>
            <a onClick={() => setTableKey("population")} className={tableKey==="population" ? "active" : ""}>
              Population
            </a>
          </nav>
        </header>
        <div className="content-columns"><DataTable tableType={tableKey}/></div>
      </main>
      
    </div>
  );
};


export default Dashboard;