import React from 'react';
import './sidebar.css';
import { assets } from '../assets/assetss';

const Sidebar = () => {
  return (
    <div className="sidebar">
  <div className="home">
    <img src={assets.home} alt="Home" />
    <p>Home</p>
  </div>
  <hr />
  <div className="sorts">
    <div className="Second">
      <img src={assets.sort} alt="Home" />
      <p>Sorts</p>
    </div>
    <p className="logarithmic">LOGARITHMIC</p>
    <ul>
      <li>Quick Sort</li>
      <li>Merge Sort</li>
      <li>Heap Sort</li>
    </ul>

    <p className="quadratic">QUADRATIC</p>
    <ul>
      <li>Bubble Sort</li>
      <li>Selection Sort</li>
      <li>Insertion Sort</li>
    </ul>

    <p className="weird">WEIRD</p>
    <ul>
      <li>Bitonic Sort</li>
      <li>Radix Sort</li>
      <li>Shell Sort</li>
    </ul>
  </div>
</div>
  );
};

export default Sidebar;
