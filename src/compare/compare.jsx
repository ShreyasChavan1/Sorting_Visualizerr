import React, { useContext, useEffect, useState } from 'react'
import './compare.css';
import Naavbar from '../component/navbar';
import { context } from '../backend/context';
import Sidebar from '../sidbar/sidebar';
import Visualiser from '../Visualizer/visualiser';
const Compare = () => {
    const {extended} = useContext(context);
    const [array,setArray] = useState([]);
    const [size,setSize] = useState(50);
    const [colors,setColors] = useState([]);
    const [speed,setSpeed] = useState(50);
    
    useEffect(() => {
      resetarray();
    },[]);

    const resetarray = () =>{
      const newarray = [];
      for(let i = 0 ; i < size ; i++){
        newarray.push(randomGenerate(10,300));
      }
      setArray(newarray);
    }

    const randomGenerate = (min,max) => Math.floor(Math.random() * ( max - min + 1) + min);
  return (
    <>
    <Naavbar />
    {extended && <Sidebar />}
    <div className="back">
      <div className="compare">
        <div className="graph1">
            {
              array.map((i,ind)=>(
                <div className="bars" key={ind}
                style={{height:`${0.7*i}px`, 
                width:'2px' }}>
                </div>
              ))
            }
        </div>
        <div className="graph2">
        {
              array.map((i,ind)=>(
                <div className="bars" key={ind}
                style={{height:`${0.7*i}px`, 
                width:'2px' }}>
                </div>
              ))
            }
        </div>        
      </div>
    </div>
    </>
  )
}

export default Compare
{/* {
    arr.map((_,index) => (
        <>
            <div key={index} className="box">

            </div>
        </>
    ))
} */}