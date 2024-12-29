import React, { useContext, useEffect, useState } from 'react';
import './visualiser.css';
import Naavbar from '../component/navbar';
import { context } from '../backend/context';
import Sidebar from '../sidbar/sidebar';
import * as Algorithms from './Algorithms';
import Footer from '../footer/footer';
import { useRef } from 'react';
import Description from './description';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assetss';

const Visualiser = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [sortingSpeed, setSortingSpeed] = useState(50);
  // const speedRef = useRef(sortingSpeed);
  const [sorting, setSorting] = useState(false);
  const stopRef = useRef(false);
  const [color,setColor] = useState([]);
  const { extended , selectedAlgo } = useContext(context);

  const params = useParams();
  
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
              if (value2 !== undefined && index2 !== undefined) newArray[index2] = value2;
        
              const newColors = newArray.map((_, i) =>
                i === index || i === index2
                  ? isComparing
                    ? "red"
                    : "green"
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

  const reversearray = async () =>{
    let n = array.length;
    let i = 0;
    while(i < n){
      [array[i],array[n - 1]] = [array[n-1],array[i]];
      await visualiseArray(i,array[i],n -1,array[n-1],false);
      i++;
      n--;
    }
  }

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
        <div className="sortop">

          <div className="algoname">
            <p>{selectedAlgo}</p>
          </div>
          <div className="controls">
            <button className="btnn" onClick={() => resetArray()} disabled={sorting}><img src ={assets.shuffle}/></button>
            <div className="slider_div">
              <input 
                onChange={(e) => setSize(Number(e.target.value))} 
                type="range" 
                id="slider" 
                className="slider" 
                min={selectedAlgo === "Bitonicsort" ? 16 : 10} 
                max={selectedAlgo === "Bitonicsort" ? 512 :500} 
                value={size}
                step={selectedAlgo === "Bitonicsort" ? 16 : 1}
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
                disabled={sorting}
              />
              <span>Time: {sortingSpeed}ms</span>
            </div>
            <button 
              className="btnn" 
              disabled={sorting}
              onClick={() => startSorting()} 
            >
              <img src={assets.soort} />
            </button>
            <button className="btnn" onClick={togglestop} > Stop </button>
            <button className="btnn" onClick={reversearray} disabled={sorting}> rev </button>
          </div>
        </div>

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
        
      </div>
      <Description/>
      <Footer/>
    </>
  );
};

export default Visualiser;
