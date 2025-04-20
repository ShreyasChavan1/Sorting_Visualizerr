import React, { useContext, useState } from 'react';
import './sidebar.css';
import { context } from '../backend/context';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const {selectedAlgo,setSelectedAlgo,submenu,setSubmenu} = useContext(context);
  
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
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Quicksort')}>Quick Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Mergesort')}>Merge Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Heapsort')}>Heap Sort</li></Link>
            </ul>

            <span className="quadratic">QUADRATIC</span>
            <ul>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Bubblesort')}>Bubble Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Shakersort')}>Shaker Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Selectionsort')}>Selection Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Insertionsort')}>Insertion Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Pancakesort')}>Pancakesort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Oddevensort')}>Odd even sort</li></Link>
            </ul>

            <span className="weird">WEIRD</span>
            <ul>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Bitonicsort')}>Bitonic Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Shellsort')}>Shell Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Radixsort')}>Radix Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Combsort')}>Comb Sort</li></Link>
              <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Bongosort')}>Bongo Sort</li></Link>
              {/* <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Stoogesort')}>Stooge Sort</li></Link> */}
            </ul>
            <span className="weird">CUSTOM</span>
            <ul>
            <Link to='/Sorting_Visualizerr/sorts'><li onClick={() => setSelectedAlgo('Customsort')}>Cusotom Sort</li></Link>
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