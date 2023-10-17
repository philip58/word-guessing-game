import React from "react";

function InputRow(props){

    return(
        <div className="row-container">
            <div style={props.colors ? {backgroundColor: props.colors[0]} : null} className="box"> 
                <p>{props.guess[0]}</p>
            </div>
            <div style={props.colors ? {backgroundColor: props.colors[1]} : null} className="box">
                <p>{props.guess[1]}</p>
            </div>
            <div style={props.colors ? {backgroundColor: props.colors[2]} : null} className="box">
                <p>{props.guess[2]}</p>
            </div>
            <div style={props.colors ? {backgroundColor: props.colors[3]} : null} className="box">
                <p>{props.guess[3]}</p>
            </div>
            <div style={props.colors ? {backgroundColor: props.colors[4]} : null} className="box">
                <p>{props.guess[4]}</p>
            </div>
        </div>
    );
}

export default InputRow;