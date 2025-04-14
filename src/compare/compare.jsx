import React, { useContext, useEffect, useRef, useState } from 'react'
import './compare.css';
import Naavbar from '../component/navbar';
import { context } from '../backend/context';
import Sidebar from '../sidbar/sidebar';
import * as Algorithms from '../Visualizer/Algorithms'
import { collection, doc, getDocs ,getDoc, query, where} from "firebase/firestore";
import { db } from '../backend/firebase';
const Compare = () => {
    const {extended} = useContext(context);
    const [algo,setAlgo] = useState('Quicksort');
    const [algo2,setAlgo2] = useState('Quicksort');
    const [array,setArray] = useState([]);
    const [array2,setArray2] = useState([]);
    const [size,setSize] = useState(200);
    const [colors,setColors] = useState([]);
    const [colors2,setColors2] = useState([]);
    const [speed,setSpeed] = useState(50);
    const [sorting,setSorting] = useState(false);
    const stopRef = useRef(false);

    const [timecomplex,setTimecomplex] = useState("null");
    const [spacecomplex,setSpacecomplex] =useState("null");

    const [timecomplex1,setTimecomplex1] = useState("null");
    const [spacecomplex1,setSpacecomplex1] =useState("null");

    const [comparisons,setComparisons] = useState(0);
    const [swaps,setSwaps] = useState(0);

    const [comparisons1,setComparisons1] = useState(0);
    const [swaps1,setSwaps1] = useState(0);

    const [execTime1, setExecTime1] = useState(0);
const [execTime2, setExecTime2] = useState(0);


    const getData = async() =>{
      const userRef = collection(db,"Algo-Description");
      const q = query(userRef,where("Name","==",algo));
      const q1 = query(userRef,where("Name","==",algo2));
      
      try {
          const querysnapshot = await getDocs(q);
          const wst = querysnapshot.docs[0].data().Average;
          const spc = querysnapshot.docs[0].data().Space;
          
          const querysnapshot1 = await getDocs(q1);
          const wst1 = querysnapshot1.docs[0].data().Average;
          const spc1 = querysnapshot1.docs[0].data().Space;

          setTimecomplex(wst.toString());
          setSpacecomplex(spc.toString());
          
          setTimecomplex1(wst1.toString());
          setSpacecomplex1(spc1.toString());

      } catch (error) {
          alert("there is error")
      }
  }

    useEffect(() => {
      resetarray();
    },[size]);
    useEffect(() => {
      getData();
    },[algo,algo2]);

    const resetarray = () =>{
      const newarray = [];
      for(let i = 0 ; i < size ; i++){
        newarray.push(randomGenerate(10,500));
      }
      setArray(newarray);
      setArray2([...newarray]);
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

    const startsort = async () => {
      setSorting(true);
      stopRef.current = false;
    
      let execTime1 = 0;
      let execTime2 = 0;
    
      const sorting1 = Algorithms[algo];
      const sorting2 = Algorithms[algo2];
    
      const promises = [];
    
      if (sorting1) {
        const t1 = performance.now();
        const promise1 = sorting1([...array], (i, v, i2, v2, c, s) => visualize(i, v, i2, v2, c, false), setComparisons, setSwaps).then(() => {
          const t2 = performance.now();
          execTime1 = (t2 - t1).toFixed(2);
          setExecTime1(execTime1); 
        });
        promises.push(promise1);
      }
    
      if (sorting2) {
        const t3 = performance.now();
        const promise2 = sorting2([...array], (i, v, i2, v2, c, s) => visualize(i, v, i2, v2, c, true), setComparisons1, setSwaps1).then(() => {
          const t4 = performance.now();
          execTime2 = (t4 - t3).toFixed(2);
          setExecTime2(execTime2); 
        });
        promises.push(promise2);
      }
    
      await Promise.all(promises);
      setSorting(false);
    };
    
    const handlestop = () =>{
      stopRef.current = true;
      setSorting(false);
    }
    const randomGenerate = (min,max) => Math.floor(Math.random() * ( max - min + 1) + min);
    const containerwidth = 580;
    const barwidth = Math.max(Math.floor((containerwidth/array.length),2))
    // console.log(comparisons);
    // console.log(comparisons1);
    const reverse = async () => {
      let n = array.length;
      let i = 0;
      while (i < n) {
        [array[i], array[n - 1]] = [array[n - 1], array[i]];
        await visualize(i, array[i], n - 1, array[n - 1], false);
        i++;
        n--;
      }
    }
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
          <button onClick={resetarray}>New</button>
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
      <div className="Analysis">
        <div className="info-graph1">
          <div className="text">
          <h3>Algorithm 1: {algo}</h3>
              <p>Time Complexity: {timecomplex}</p>
              <p>Space Complexity: {spacecomplex}</p>
              <p>{algo === "Bongosort"? "Attempts" : "Comparisons"} : {comparisons}</p>
              <p>Swaps: {swaps}</p>
              <p>Execution Time: {execTime1} ms</p>
          </div>
        </div>
        <div className="info-graph2">
          <div className="text">

        <h3>Algorithm 2: {algo2}</h3>
            <p>Time Complexity: {timecomplex1}</p>
            <p>Space Complexity: {spacecomplex1}</p>
            <p>{algo2 === "Bongosort"? "Attempts" : "Comparisons"} : {comparisons1} </p>
            <p>Swaps:{swaps1} </p>
            <p>Execution Time:{execTime2} ms</p>
          </div>
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