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
    const [codes,setCodes] = useState({});

    const getdata = async() =>{
        const userRef = collection(db,"Algo-Description");
        const q = query(userRef,where("Name","==",selectedAlgo));
        
        try {
            const querysnapshot = await getDocs(q);
            const dec = querysnapshot.docs[0].data().Description;
            const cod = querysnapshot.docs[0].data().Codes;
            setCodes(cod);
            setDesc(dec.toString());
        } catch (error) {
            alert("there is error")
        }
    }
    useEffect(()=>{
        getdata();
    },[selectedAlgo])

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
                                
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="card-text">
                                <pre>
                                    <code >
                                        <div style={{ display: "block", textAlign: "left" ,color:"cyan"}}
                                            className={`language-${lang}`}
                                            dangerouslySetInnerHTML={{
                                                __html: codes[lang],
                                            }}
                                        />
                                    </code>
                                </pre>
                                </div>
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