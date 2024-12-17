import React, { useContext, useEffect } from 'react'
import './description.css'
import { useState } from 'react'
import { collection, doc, getDocs ,getDoc, query, where} from "firebase/firestore";
import { context } from '../backend/context';
import { db } from '../backend/firebase';

const Description = () => {
    const [lang, setLang] = useState('c++');
    const {selectedAlgo} = useContext(context);
    const [desc,setDesc] = useState("");


    
      

    const getdata = async() =>{
        const userRef = collection(db,"Algo-Description");
        const q = query(userRef,where("Name","==",selectedAlgo));

        try {
            const querysnapshot = await getDocs(q);
            const dec = querysnapshot.docs[0].data().Description; // Get the description from the first document
            setDesc(dec.toString());
        } catch (error) {
            alert("there is error")
        }
    }
    useEffect(()=>{
        getdata();
    },selectedAlgo)

    return (
        <>
            <div className="desc">
                <div className="left">
                    <div className="information">
                    <h2 className='Heading'>Description</h2>
                    <br/>
                        {desc}
                    </div>
                    <div className="space" style={{height:"10vh"}}>

                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            <ul className="nav  card-header-tabs">
                                <li onClick={()=>setLang('c++')} className="nav-item">
                                    <a className= {`nav-link ${lang === 'c++' ? 'act' :""}`}>C++</a>
                                </li>
                                <li onClick={()=>setLang('python')} className="nav-item">
                                    <a className= {`nav-link ${lang === 'python' ? 'act' :""}`}>Python</a>
                                </li>
                                <li onClick={()=>setLang('java')} className="nav-item">
                                    <a className= {`nav-link ${lang === 'java' ? 'act' :""}`}>Java</a>
                                </li>
                                <li onClick={()=>setLang('js')} className="nav-item">
                                    <a className= {`nav-link ${lang === 'js' ? 'act' :""}`}>Javascript</a>
                                </li>
                                <li onClick={()=>setLang('rust')} className="nav-item">
                                    <a className= {`nav-link ${lang === 'rust' ? 'act' :""}`}>Rust</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            
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
                    <div style={{height:"36vh"}}></div>
                </div>
            </div>
        </>
    )
}

export default Description