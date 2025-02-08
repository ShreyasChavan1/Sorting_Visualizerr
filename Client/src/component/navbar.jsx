import React, { useContext } from 'react';
import './navbar.css';
import { context } from '../backend/context';

const Naavbar = () => {
  const {extended,setExtended} = useContext(context);
  return (
    <div className="navbar custom-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-start">
        <span className="material-symbols-outlined me-2" onClick={()=>setExtended(prev=>!prev)}>
        menu
        </span>
          <span>Sort Visualizer</span>
      </div>
    </div>
  );
};

export default Naavbar;
