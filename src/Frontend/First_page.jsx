import { useState, React, useContext } from 'react';
import Naavbar from '../component/navbar';
import Sidebar from '../sidbar/sidebar';
import './First.css'; // Add styles for layout
import { context } from '../backend/context';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import VantaBackground from '../bg/vanta';

const First = () => {
  const { extended } = useContext(context);

  return (
    <>
      <div style={{ position: 'absolute',width:'100%',overflow: 'hidden',zIndex:-1}}>
        <VantaBackground/>
      </div>
    <div className="layout" >
      <Naavbar />
      <div className="content">
        {extended ? <Sidebar /> : null}
        <div className="main">
          <div className="title">
            <p className='titlename'>LET'S SORT</p> 
          </div>
        </div>
      </div>
      <div className="About">
        <div className="About_sort">
        <h2 className='Heading'>Sorting Algorithms</h2>
          <p className="first_half">Sorting algorithms are used to sort a data structure according to a specific order relationship, such as numerical order or lexicographical order.
          </p>
          <p className="second_half">This operation is one of the most important and widespread in computer science. For a long time, new methods have been developed to make this procedure faster and faster.
          </p>
          <p className="third_half">There are currently hundreds of different sorting algorithms, each with its own specific characteristics. They are classified according to two metrics: space complexity and time complexity.

          Those two kinds of complexity are represented with asymptotic notations, mainly with the symbols O, Θ, Ω, representing respectively the upper bound, the tight bound, and the lower bound of the algorithm's complexity, specifying in brackets an expression in terms of n, the number of the elements of the data structure.
          <br></br> <br></br>
          Most of them fall into two categories:
          <br />
          <ul>
            <li>
              Logarithmic
              <br />
              The complexity is proportional to the binary logarithm (i.e to the base 2) of n.
              An example of a logarithmic sorting algorithm is Quick sort, with space and time complexity O(n × log n).
            </li>
            <br />
            <li>
            Quadratic
            <br />
            The complexity is proportional to the square of n.
            An example of a quadratic sorting algorithm is Bubble sort, with a time complexity of O(n2).
            </li>
          </ul>
          <br />
          Space and time complexity can also be further subdivided into 3 different cases: best case, average case and worst case.

          Sorting algorithms can be difficult to understand and it's easy to get confused. We believe visualizing sorting algorithms can be a great way to better understand their functioning while having fun!
          </p>
        <div className="d-flex justify-content-center align-items-center">
          <Link to = '/sorts'><button type="button" className="bton">Sorts</button></Link>
        </div>
        </div>
        </div>
        <Footer/>
    </div>
    </>
  );
};

export default First;
