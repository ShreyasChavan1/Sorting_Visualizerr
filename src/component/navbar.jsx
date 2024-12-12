import React, { useContext } from 'react';
import './navbar.css';
import { context } from '../backend/context';

const Naavbar = () => {
  const {extended,setExtended} = useContext(context);
  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a className="navbar-brand d-flex align-items-center" href="#">
        <span className="material-symbols-outlined me-2" onClick={()=>setExtended(prev=>!prev)}>
        menu
      </span>
          <span>Sort Visualizer</span>
        </a>
      </div>
    </nav>
  );
};

export default Naavbar;
