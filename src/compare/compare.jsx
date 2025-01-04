import React, { useContext } from 'react'
import './compare.css';
import Naavbar from '../component/navbar';
import { context } from '../backend/context';
import Sidebar from '../sidbar/sidebar';
const Compare = () => {
    const {extended} = useContext(context);
    const arr = new Array(28).fill(null);
  return (
    <>
    <Naavbar />
    {extended && <Sidebar />}
    <div className="back">
        {
            arr.map((_,index) => (
                <>
                    <div key={index} className="box">

                    </div>
                </>
            ))
        }
    </div>
    </>
  )
}

export default Compare