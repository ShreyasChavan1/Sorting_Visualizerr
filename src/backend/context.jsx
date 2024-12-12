import {  useContext } from "react";
import { createContext, useState,useEffect } from "react";

export const context = createContext();

    const ContextProvider = (props) =>{
        const [extended,setExtended] = useState(false);
        const [selectedAlgo, setSelectedAlgo] = useState('mergesort');
    const contextValue = {
        extended,
        setExtended,
        selectedAlgo,
        setSelectedAlgo
    }
    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )

}
export default ContextProvider