import React, { useContext, useEffect, useState, useRef } from "react";
import "./visualiser.css";
import Naavbar from "../component/navbar";
import { context } from "../backend/context";
import Sidebar from "../sidbar/sidebar";
import * as Algorithms from "./Algorithms";
import Footer from "../footer/footer";
import Description from "./description";
import { useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";

const Visualiser = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [sortingSpeed, setSortingSpeed] = useState(50);
  const [sorting, setSorting] = useState(false);
  const stopRef = useRef(false);
  const [color, setColor] = useState([]);
  const { extended, selectedAlgo } = useContext(context);
  const [graphHeightfactor, setGraphHeightfactor] = useState(0.8);
  const { submenu, setSubmenu } = useContext(context);
  const [customerror,setCustomerror] = useState("");

  useEffect(() => {
    resetArray();
    setSubmenu(true);
    const updateGraphHeight = () => {
      setGraphHeightfactor(window.innerWidth < 480 ? 0.65 : 0.8);
    };
    window.addEventListener("resize", updateGraphHeight);
    updateGraphHeight();
    return () => window.removeEventListener("resize", updateGraphHeight);
  }, [size]);

  const resetArray = () => {
    const newArray = Array.from({ length: size }, () => randomFromInterval(10, 700));
    setArray(newArray);
  };

  const randomFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const visualiseArray = async (index, value, index2, value2, isComparing = false) => {
    return new Promise((resolve) => {
      if (stopRef.current) {
        resolve();
        return;
      }
      setTimeout(() => {
        setArray((prevArray) => {
          const newArray = [...prevArray];
          if (value !== undefined) newArray[index] = value;
          if (value2 !== undefined && index2 !== undefined) newArray[index2] = value2;

          const newColors = newArray.map((_, i) =>
            i === index || i === index2 ? (isComparing ? "red" : "green") : "default"
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

  const reverseArray = async () => {
    let n = array.length;
    let i = 0;
    while (i < n) {
      [array[i], array[n - 1]] = [array[n - 1], array[i]];
      await visualiseArray(i, array[i], n - 1, array[n - 1], false);
      i++;
      n--;
    }
  };

  const toggleStop = () => {
    stopRef.current = true;
    setSorting(false);
  };

  // Default custom sort example (Bubble Sort)
  const [customCode, setCustomCode] = useState(`
    /*
 * Custom Sorting Function Template
 * 
 * Users must define an **async function** named customSort that:
 * 1. Takes two parameters: 
 *    - array (The array to be sorted)
 *    - visualize (A function to visually update swaps/comparisons)
 * 2. Uses "await visualize(index1, newValue1, index2, newValue2, isComparing)" to:
 *    - Update values at "index1" and "index2" (swap operation)
 *    - Highlight comparisons (isComparing = true)
 * 3. Implements any sorting logic (e.g., Bubble Sort, Quick Sort, etc.)
 */

   async function customSort(array, visualize) {
    const n = array.length;
    // Example: Bubble Sort Algorithm (Users can modify this)
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {  
            // Compare adjacent elements
            await visualize(j, array[j], j + 1, array[j + 1], true);
            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];          
                // Update visualization
                await visualize(j, array[j], j + 1, array[j + 1], false);
            }
        }
    }
}`);

  const handleCustomSort = async () => {
    setCustomerror("");
    try {
      setSorting(true);
      stopRef.current = false;
      const sortFunction = new Function("array", "visualize", `${customCode}; return customSort;`);
      const sortingAlgo = sortFunction();
      if (typeof sortingAlgo !== "function") {
        throw new Error("Invalid sorting function");
      }
      await sortingAlgo([...array], visualiseArray);
      setSorting(false);
    } catch (error) {
      setSorting(false);
      console.error("Error executing custom sort:", error);
      setCustomerror(error.message);
    }
  };

  const containerWidth = 800;
  const barWidth = Math.max(Math.floor(containerWidth / array.length), 2);

  return (
    <div className="parent">
      <Naavbar />
      {extended && <Sidebar />}
      <div className="bg">
        <div className="sortop">
          <div className="algoname">
            <p>{selectedAlgo}</p>
          </div>
          <div className="controls">
            <button className="btnn" onClick={resetArray} disabled={sorting}>New</button>
            <div className="slider_div">
              <input 
                onChange={(e) => setSize(Number(e.target.value))} 
                type="range" 
                className="slider" 
                min={10} max={500} value={size} step={1}
                disabled={sorting}
              />
              <span>Elements: {size}</span>
            </div>
            <div className="slider_div">
              <input 
                onChange={(e) => setSortingSpeed(Number(e.target.value))} 
                type="range" 
                className="slider" 
                min="5" max="2000" value={sortingSpeed}
                disabled={sorting}
              />
              <span>Time: {sortingSpeed}ms</span>
            </div>
            <button className="btnn" disabled={sorting} onClick={startSorting}>Sort</button>
            <button className="btnn" onClick={toggleStop}>Stop</button>
            <button className="btnn" onClick={reverseArray} disabled={sorting}>Rev</button>
          </div>
        </div>

        <div className="graphs">
          {array.map((i, ind) => (
            <div
              className={`graph ${color[ind]}`}
              key={ind}
              style={{ height: `${i * graphHeightfactor}px`, width: `${barWidth}px` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="divider"></div>



      {selectedAlgo === "Customsort" ? (
        <div className="cu">
          <Editor
            height="500px"
            width="50%"
            defaultLanguage="javascript"
            value={customCode}
            onChange={(value) => setCustomCode(value)}
            theme="vs-dark"
            options={{ fontSize: 14, minimap: { enabled: false } }}
          />
          <div className="cu1">
          <button className="btnn" onClick={handleCustomSort} disabled={sorting}>
            Sort
          </button>
          {customerror && (
        <div className="error-message">
            <p>Error: {customerror}</p>
        </div>
    )}
          </div>
        </div>
      ) : (
        <Description />
      )}

      <Footer />
    </div>
  );
};

export default Visualiser;
