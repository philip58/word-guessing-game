import React from "react";

function InputRow(props){
    return(
        <div className="row-container">
            <div className="box"> 
                <p>{props.guess[0]}</p>
            </div>
            <div className="box">
                <p>{props.guess[1]}</p>
            </div>
            <div className="box">
                <p>{props.guess[2]}</p>
            </div>
            <div className="box">
                <p>{props.guess[3]}</p>
            </div>
            <div className="box">
                <p>{props.guess[4]}</p>
            </div>
        </div>
    );
}

export default InputRow;