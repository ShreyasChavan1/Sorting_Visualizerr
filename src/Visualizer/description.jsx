import React from 'react'
import './description.css'
const Description = () => {
    return (
        <>
            <div className="desc">
                <div className="left">
                    <div className="information">
                    <h2 className='Heading'>Sorting Algorithms</h2>
                        Merge Sort is a sorting algorithm based on the Divide et Impera technique, like Quick Sort. It can be implemented iteratively or recursively, using the Top-Down and Bottom-Up algorithms respectively. We represented the first one.

                        The algorithm divides the data structure recursively until the subsequences contain only one element. At this point, the subsequences get merged and ordered sequentially. To do so, the algorithm progressively builds the sorted sublist by adding each time the minimum element of the next two unsorted subsequences until there is only one sublist remaining. This will be the sorted data structure.
                    </div>
                    <div className="space" style={{height:"20vh"}}>

                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <a className="nav-link">Active</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">Disabled</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <table className='complexity'>
                        <tr>
                            <td>Average Complexity</td>
                            <td>O(n × log n)</td>
                        </tr>
                        <tr>
                            <td>Best Case</td>
                            <td>O(n × log n)</td>
                        </tr>
                        <tr>
                            <td>Worst Case</td>
                            <td>O(n × log n)</td>
                        </tr>
                        <tr>
                            <td>Space Complexity</td>
                            <td>O(n)</td>
                        </tr>
                    </table>
                    <div style={{height:"60vh"}}></div>
                </div>
            </div>
        </>
    )
}

export default Description