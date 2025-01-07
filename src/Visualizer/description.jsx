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

    const [average,setAverage] = useState("");
    const [best,setBest] = useState("");
    const [worst,setWorst] = useState("");
    const [space,setSpace] = useState("");

    const getdata = async() =>{
        const userRef = collection(db,"Algo-Description");
        const q = query(userRef,where("Name","==",selectedAlgo));
        
        try {
            const querysnapshot = await getDocs(q);
            const dec = querysnapshot.docs[0].data().Description;
            const cod = querysnapshot.docs[0].data().Codes;
            const avg = querysnapshot.docs[0].data().Average;
            const bst = querysnapshot.docs[0].data().Best;
            const wst = querysnapshot.docs[0].data().Worst;
            const spc = querysnapshot.docs[0].data().Space;

            setAverage(avg.toString());
            setBest(bst.toString());
            setWorst(wst.toString());
            setSpace(spc.toString());
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
            <div className="dec">
                <div className="top">
                    <div className="information">
                        <h2 className='Heading'>Description</h2>
                        <br />
                        {desc}
                    </div>
                    <table className='complexity'>
                        <tr>
                            <td>Average Complexity</td>
                            <td>{average}</td>
                        </tr>
                        <tr>
                            <td>Best Case</td>
                            <td>{best}</td>
                        </tr>
                        <tr>
                            <td>Worst Case</td>
                            <td>{worst}</td>
                        </tr>
                        <tr>
                            <td>Space Complexity</td>
                            <td>{space}</td>
                        </tr>
                    </table>
            </div>        
                <div className="bottom">
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
                                        <div style={{ display: "block", textAlign: "left" ,color:"white"}}
                                            className="language"
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
        </div>
        </>
    )
}

export default Description