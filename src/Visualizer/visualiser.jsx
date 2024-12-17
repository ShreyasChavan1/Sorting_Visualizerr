import React, { useContext, useEffect, useState } from 'react';
import './visualiser.css';
import Naavbar from '../component/navbar';
import { context } from '../backend/context';
import Sidebar from '../sidbar/sidebar';
import * as Algorithms from './Algorithms';
import Footer from '../footer/footer';
import { useRef } from 'react';
import Description from './description';

const Visualiser = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [sortingSpeed, setSortingSpeed] = useState(50);
  const [sorting, setSorting] = useState(false);
  const stopRef = useRef(false);
  const [color,setColor] = useState([]);
  const { extended , selectedAlgo } = useContext(context);
  
  useEffect(() => {
    resetArray();
  }, [size]);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(randomFromInterval(10, 700));
    }
    setArray(newArray); 
  };
  
  const randomFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const visualiseArray = async (index, value, index2, value2, isComparing = false) => {
    return new Promise((resolve) => {
        if(stopRef.current){
          resolve();
          return
        }
          setTimeout(() => {
            setArray((prevArray) => {
              const newArray = [...prevArray];
      
              if (value !== undefined) newArray[index] = value;
              if (value2 !== undefined) newArray[index2] = value2;
        
              const newColors = newArray.map((_, i) =>
                i === index || i === index2
                  ? isComparing
                    ? "red"
                    : "default"
                  : "default"
              );
              setColor(newColors);
              return newArray;
            });
            resolve();
          }, sortingSpeed);
    });
  };
    
  const startSorting = async () => {
    setSorting(true);
    stopRef.current = false;
    const sortingAlgo = Algorithms[selectedAlgo];
    if (sortingAlgo) {
      await sortingAlgo([...array], visualiseArray);
    }
    setSorting(false);
  };
  const togglestop = () =>{
    stopRef.current = true;
    setSorting(false);
  };
  const containerWidth = 800;
  const barWidth = Math.max(Math.floor(containerWidth / array.length), 2);
  return (
    <>
      <Naavbar />
      {extended && <Sidebar />}
      <div className="bg">
        <div className="graphs">
          {array.map((i, ind) => (
            <div
            className={`graph ${color[ind]}`}
              key={ind}
              style={{
                height: `${i * 0.8}px`,
                width: `${barWidth}px`,
                
              }}
            ></div>
          ))}
        </div>
        {/* <hr className="divider" /> */}
        <div className="controls">
          <button className="btnn" onClick={() => resetArray()} disabled={sorting}>Generate New</button>
          <div className="slider_div">
            <input 
              onChange={(e) => setSize(Number(e.target.value))} 
              type="range" 
              id="slider" 
              className="slider" 
              min="10" 
              max="500" 
              value={size}
              disabled={sorting}
            />
            <span>Elements: {size}</span>
          </div>
          <div className="slider_div">
            <input 
              onChange={(e) => setSortingSpeed(Number(e.target.value))} 
              type="range" 
              id="speed-slider" 
              className="slider" 
              min="5" 
              max="2000" 
              value={sortingSpeed}
            />
            <span>Time: {sortingSpeed}ms</span>
          </div>
          <button 
            className="btnn" 
            disabled={sorting}
            onClick={() => startSorting()} 
            style={{ marginLeft: '50px' }}
          >
            {selectedAlgo}
          </button>
          <button className="btnn" onClick={togglestop} style={{ marginLeft: '40px' }}> Stop </button>
        </div>
      </div>
      <Description/>
      <Footer/>
    </>
  );
};

export default Visualiser;
