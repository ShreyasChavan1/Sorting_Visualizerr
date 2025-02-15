import React, { useContext, useEffect, useRef, useState } from 'react'
import './compare.css';
import Naavbar from '../component/navbar';
import { context } from '../backend/context';
import Sidebar from '../sidbar/sidebar';
import Visualiser from '../Visualizer/visualiser';
import * as Algorithms from '../Visualizer/Algorithms'
const Compare = () => {
    const {extended} = useContext(context);
    const [algo,setAlgo] = useState('Quicksort');
    const [algo2,setAlgo2] = useState('Mergesort');
    const [array,setArray] = useState([]);
    const [array2,setArray2] = useState([]);
    const [size,setSize] = useState(200);
    const [colors,setColors] = useState([]);
    const [colors2,setColors2] = useState([]);
    const [speed,setSpeed] = useState(50);
    const [sorting,setSorting] = useState(false);
    const stopRef = useRef(false);
    useEffect(() => {
      resetarray();
    },[size]);

    const resetarray = () =>{
      const newarray = [];
      for(let i = 0 ; i < size ; i++){
        newarray.push(randomGenerate(10,500));
      }
      setArray(newarray);
      setArray2([...newarray]);
    }

    const reverse = async () =>{
      let n = array.length;
      let i = 0;
      while(i < n){
        [array[i],array[n - 1]] = [array[n-1],array[i]];
        await visualize(i,array[i],n -1,array[n-1],false);
        i++;
        n--;
      }
    }

    const visualize = async(index,value,index2,value2,isComparing = false,isSecond = false) =>{
      return new Promise((resolve)=>{
        if(stopRef.current){
          resolve();
          return;
        }

        setTimeout(() => {
          if(isSecond){
            setArray2((prevArray2)=>{
              const newarray2 = [...prevArray2];

              if(value !== undefined) newarray2[index] = value;
              if(value2 !== undefined) newarray2[index2] = value2;

              const newColors2 = newarray2.map((_, i) =>
                i === index || i === index2
                  ? isComparing
                    ? "red"
                    : "green"
                  : "default"
              );
              setColors2(newColors2);
              return newarray2;
            })
          }else{
            setArray((prevArray)=>{
              const newarray = [...prevArray];

              if(value !== undefined) newarray[index] = value;
              if(value2 !== undefined) newarray[index2] = value2;

              const newColors = newarray.map((_, i) =>
                i === index || i === index2
                  ? isComparing
                    ? "red"
                    : "green"
                  : "default"
              );
              setColors(newColors);
              return newarray;
            })
          }
          resolve();
        }, speed);
      })
    }

    const startsort = async() =>{
      setSorting(true);
      stopRef.current = false;
      const promises = [];
      const sorting1 = Algorithms[algo];
      const sorting2 = Algorithms[algo2];
      if(sorting1){
       const promise1 = sorting1([...array],(index,value,index2,value2,isComparing,isSecond) => visualize(index,value,index2,value2,isComparing,false));
       promises.push(promise1);
      }
      if(sorting2){
        const promise2 =  sorting2([...array],(index,value,index2,value2,isComparing,isSecond) => visualize(index,value,index2,value2,isComparing,true));
        promises.push(promise2);
      }
      await Promise.all(promises);
      setSorting(false);

    }
    const handlestop = () =>{
      stopRef.current = true;
      sorting(false);
    }
    const randomGenerate = (min,max) => Math.floor(Math.random() * ( max - min + 1) + min);
    const containerwidth = 580;
    const barwidth = Math.max(Math.floor((containerwidth/array.length),2))
  return (
    <div className="whole">
    <Naavbar />
    {extended && <Sidebar />}
    <div className="back">
      <div className="compare">
        <div className="controlls">
          <select name="algos" className='algoselector' onChange={(e)=>setAlgo(e.target.value)} id="">
            <option value="Quicksort" >Quicksort</option>
            <option value="Mergesort">Mergesort</option>
            <option value="Heapsort">Heapsort</option>
            <option value="Bubblesort">Bubblesort</option>
            <option value="Shakersort">Shakersort</option>
            <option value="Selectionsort">Selectionsort</option>
            <option value="Insertionsort">Insertionsort</option>
            <option value="Pancakesort">Pancakesort</option>
            <option value="Oddevensort">Oddevensort</option>
            <option value="Shellsort">Shellsort</option>
            <option value="Radixsort">Radixsort</option>
            <option value="Combsort">Combsort</option>
            <option value="Bongosort">Bongosort</option>
            <option value="Stoogesort">Stoogesort</option>
          </select>
          <button onClick={resetarray}>New</button>
          <input type="range" onChange={(e)=> setSize(Number(e.target.value))} 
          min={ 10} 
          max={230} 
          value={size}
          step={ 1}
          disabled={sorting}/>
          <input type="range" onChange={(e)=> setSpeed(Number(e.target.value))} 
          min="5"
          max="1000"
          value={speed}
          disabled={sorting}/>
          <button onClick={()=>startsort()}>Sort</button>
          <button onClick={()=>handlestop()}>Stop</button>
          <button onClick={reverse}>Rev</button>
          <select name="algos" className='algoselector2' onChange={(e)=>setAlgo2(e.target.value)} id="">
            <option value="Quicksort" >Quicksort</option>
            <option value="Mergesort" >Mergesort</option>
            <option value="Heapsort">Heapsort</option>
            <option value="Bubblesort">Bubblesort</option>
            <option value="Shakersort">Shakersort</option>
            <option value="Selectionsort">Selectionsort</option>
            <option value="Insertionsort">Insertionsort</option>
            <option value="Pancakesort">Pancakesort</option>
            <option value="Oddevensort">Oddevensort</option>
            <option value="Shellsort">Shellsort</option>
            <option value="Radixsort">Radixsort</option>
            <option value="Combsort">Combsort</option>
            <option value="Bongosort">Bongosort</option>
            <option value="Stoogesort">Stoogesort</option>
          </select>
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
              array2.map((i,ind)=>(
                <div className={`bars ${colors2[ind]}`} key={ind}
                style={{height:`${0.8*i}px`, 
                width:`${barwidth}px` }}>
                </div>
              ))
            }
        </div>        
      </div>
    </div>
    </div>
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