import React, { useContext, useEffect, useState } from 'react'
import './compare.css';
import Naavbar from '../component/navbar';
import { context } from '../backend/context';
import Sidebar from '../sidbar/sidebar';
import Visualiser from '../Visualizer/visualiser';
const Compare = () => {
    const {extended,selectedAlgo,setSelectedAlgo} = useContext(context);
    const [array,setArray] = useState([]);
    const [size,setSize] = useState(200);
    const [colors,setColors] = useState([]);
    const [speed,setSpeed] = useState(50);
    const [sorting,setSorting] = useState(false);
    useEffect(() => {
      resetarray();
    },[size]);

    const resetarray = () =>{
      const newarray = [];
      for(let i = 0 ; i < size ; i++){
        newarray.push(randomGenerate(10,500));
      }
      setArray(newarray);
    }

    const reverse = () =>{
      let n = array.length;
      let i =0;
      while(i < n){
        [array[i],array[n - 1]] = [array[n-1],array[i]];
        i++;
        n--;
      }
    }

    const randomGenerate = (min,max) => Math.floor(Math.random() * ( max - min + 1) + min);
    const containerwidth = 580;
    const barwidth = Math.max(Math.floor((containerwidth/array.length),2))
  return (
    <>
    <Naavbar />
    {extended && <Sidebar />}
    <div className="back">
      <div className="compare">
        <div className="controlls">
          <button onClick={resetarray}>New</button>
          <input type="range" onChange={(e)=> setSize(Number(e.target.value))} 
          min={selectedAlgo === "Bitonicsort" ? 16 : 10} 
          max={selectedAlgo === "Bitonicsort" ? 512 :230} 
          value={size}
          step={selectedAlgo === "Bitonicsort" ? 16 : 1}
          disabled={sorting}/>
          <input type="range" onChange={(e)=> setSpeed(Number(e.target.value))} 
          min="5"
          max="1000"
          value={speed}
          disabled={sorting}/>
          <button >Sort</button>
          <button >Stop</button>
          <button onClick={reverse}>Rev</button>
        </div>
        <div className="graph1 ">
            {
              array.map((i,ind)=>(
                <div className={`bars ${colors[ind]}`} key={ind}
                style={{height:`${0.8*i}px`, 
                width:`${barwidth}px` }}>
                </div>
              ))
            }
        </div>
        <div className="graph2">
        {
              array.map((i,ind)=>(
                <div className={`bars ${colors[ind]}`} key={ind}
                style={{height:`${0.8*i}px`, 
                width:`${barwidth}px` }}>
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