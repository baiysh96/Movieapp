import React from "react";
import "./Spinner.css"
import RingLoader from "react-spinners/RingLoader";




const Spinner = () => {
    return (
        <div className="spinner-container">
             <RingLoader color={'rgb(65, 143, 143)'} size={80}/>
        </div>
    );
};

export default Spinner;