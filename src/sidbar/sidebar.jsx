import React, { useContext, useState } from 'react';
import './sidebar.css';
import { context } from '../backend/context';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const {selectedAlgo,setSelectedAlgo} = useContext(context);
  const [submenu,setSubmenu] = useState(false);
  return (
    <div className="sidebar">
      <ul className='list'>
        <li className='name'>
          <i className='fas fa-home'></i>
          <Link to='/Sorting_Visualizerr'><span>Home</span></Link>
        </li>
        <hr />
        <li className='name' style={{marginLeft:'4px'}} >
        <i className='fas fa-sort'></i>
        <Link to='/Sorting_Visualizerr/sorts'><span>Sorts</span></Link>
        {submenu?  
        <i onClick={()=>setSubmenu(prev=>!prev)} style={{marginLeft:'2vw'}} class="fa-solid fa-angle-up"></i>
        :<i onClick={()=>setSubmenu(prev=>!prev)} style={{marginLeft:'2vw'}} class="fa-solid fa-angle-down"></i>}
        
        </li>
        
      
        <div className={`sorts ${submenu ? "visible" : ""}`}>
            <span className="logarithmic">LOGARITHMIC</span>
            <ul>
              <li onClick={() => setSelectedAlgo('Quicksort')}>Quick Sort</li>
              <li onClick={() => setSelectedAlgo('Mergesort')}>Merge Sort</li>
              <li onClick={() => setSelectedAlgo('Heapsort')}>Heap Sort</li>
            </ul>

            <span className="quadratic">QUADRATIC</span>
            <ul>
              <li onClick={() => setSelectedAlgo('Bubblesort')}>Bubble Sort</li>
              <li onClick={() => setSelectedAlgo('Shakersort')}>Shaker Sort</li>
              <li onClick={() => setSelectedAlgo('Selectionsort')}>Selection Sort</li>
              <li onClick={() => setSelectedAlgo('Insertionsort')}>Insertion Sort</li>
              <li onClick={() => setSelectedAlgo('Pancakesort')}>Pancakesort</li>
              <li onClick={() => setSelectedAlgo('Oddevensort')}>Odd even sort</li>
            </ul>

            <span className="weird">WEIRD</span>
            <ul>
              <li onClick={() => setSelectedAlgo('Bitonicsort')}>Bitonic Sort</li>
              <li onClick={() => setSelectedAlgo('Shellsort')}>Shell Sort</li>
              <li onClick={() => setSelectedAlgo('Radixsort')}>Radix Sort</li>
              <li onClick={() => setSelectedAlgo('Combsort')}>Comb Sort</li>
              <li onClick={() => setSelectedAlgo('Bongosort')}>Bongo Sort</li>
              <li onClick={() => setSelectedAlgo('Stoogesort')}>Stooge Sort</li>
            </ul>
        </div>
      <hr />

      <li className='name' style={{marginLeft:'4px'}}>
      <i class="fa-solid fa-code-compare"></i>
        <Link to='/Sorting_Visualizerr/compare'><span>Compare</span></Link>
        </li>
      </ul>
        
    </div>
  );
};

export default Sidebar;

{/* <div className="home">
  <Link to='/'><p>Home</p></Link>
</div>
<hr />
<div className="sorts">
  <div className="Second">

    <Link to='/sorts'><p>Sorts</p></Link>
  </div>
  <p className="logarithmic">LOGARITHMIC</p>
  <ul>
    <li onClick={() => setSelectedAlgo('Quicksort')}>Quick Sort</li>
    <li onClick={() => setSelectedAlgo('Mergesort')}>Merge Sort</li>
    <li onClick={() => setSelectedAlgo('Heapsort')}>Heap Sort</li>
  </ul>

  <p className="quadratic">QUADRATIC</p>
  <ul>
    <li onClick={() => setSelectedAlgo('Bubblesort')}>Bubble Sort</li>
    <li onClick={() => setSelectedAlgo('Shakersort')}>Shaker Sort</li>
    <li onClick={() => setSelectedAlgo('Selectionsort')}>Selection Sort</li>
    <li onClick={() => setSelectedAlgo('Insertionsort')}>Insertion Sort</li>
    <li onClick={() => setSelectedAlgo('Pancakesort')}>Pancakesort</li>
    <li onClick={() => setSelectedAlgo('Oddevensort')}>Odd even sort</li>
  </ul>

  <p className="weird">WEIRD</p>
  <ul>
    <li onClick={() => setSelectedAlgo('Bitonicsort')}>Bitonic Sort</li>
    <li onClick={() => setSelectedAlgo('Shellsort')}>Shell Sort</li>
    <li onClick={() => setSelectedAlgo('Radixsort')}>Radix Sort</li>
    <li onClick={() => setSelectedAlgo('Combsort')}>Comb Sort</li>
    <li onClick={() => setSelectedAlgo('Bongosort')}>Bongo Sort</li>
    <li onClick={() => setSelectedAlgo('Stoogesort')}>Stooge Sort</li>
  </ul>
</div> */}