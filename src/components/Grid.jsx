import React, {useEffect, useState} from "react";
import InputRow from "./InputRow";
import _ from "lodash";

function Grid(){
    const [guess, setGuess] = useState("");
    const [guessArray,setGuessArray] = useState([]);


    function handleKeyDown(event){
        if(event.key.length===1 && _.capitalize(event.key) >= "A" && _.capitalize(event.key) <= "Z" && guess.length < 5 && guessArray.length < 7){
            setGuess( (prevData)=> {
                if(prevData.length!==5)
                    return guess + _.capitalize(event.key);
                else    
                    return prevData;
            });
        }
        if(event.key === "Backspace" && guess!==""){
            setGuess((prevData)=>{
                return (prevData.substring(0,prevData.length-1));
            });
        }
        if(guess.length===5 && event.key === "Enter" && guessArray.length < 7){
            setGuessArray((prevData)=>{
                return [...prevData,guess];
            });
            setGuess(""); 
        }
    }

        useEffect(()=>{
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [handleKeyDown]);
   
        

    return(
        <div>
             <InputRow guess={guessArray[0] ? guessArray[0] : guess}/>
             <InputRow guess={guessArray[1] ? guessArray[1] : guess}/>
             <InputRow guess={guessArray[2] ? guessArray[2] : guess}/>
             <InputRow guess={guessArray[3] ? guessArray[3] : guess}/>
             <InputRow guess={guessArray[4] ? guessArray[4] : guess}/>
             <InputRow guess={guessArray[5] ? guessArray[5] : guess}/>
        </div>
    );
}

export default Grid;