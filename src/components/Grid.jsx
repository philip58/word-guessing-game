import React, {useEffect, useState} from "react";
import InputRow from "./InputRow";
import _ from "lodash";
import wordleWordlist from "wordle-wordlist";

async function getWords(){
    var words = await wordleWordlist.answers();
    let rand = Math.floor(Math.random()*words.length);

    let randomWordAnswer = words[rand];
    console.log(randomWordAnswer);
    return randomWordAnswer;
}

function Grid(){
    const [guess, setGuess] = useState("");
    const [guessArray,setGuessArray] = useState([]);
    const [answer, setAnswer] = useState("");
    const [isWon, setIsWon] = useState(false);

    useEffect(()=>{
        getWords().then((ans)=>{
            setAnswer(ans);
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    function handleKeyDown(event){
        if(guessArray.length < 7){
            for(let i = 0; i<guessArray.length;i++){
                if(_.lowerCase(guessArray[i])===answer){
                    for(let i = 0; i<8-guessArray.length;i++){
                        guessArray.push("");
                    }
                    setGuess(""); 
                    setIsWon(true);
                } 
            }
        }
        if(event.key.length===1 && _.capitalize(event.key) >= "A" && _.capitalize(event.key) <= "Z" && guess.length < 5 && guessArray.length < 7){
            setGuess( (prevData)=> {
                if(prevData.length!==5){
                    return guess + _.capitalize(event.key);
                }
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
             <InputRow answer={answer} guess={guessArray[0] ? guessArray[0] : guess}/>
             <InputRow answer={answer} guess={guessArray[1] ? guessArray[1] : guess}/>
             <InputRow answer={answer} guess={guessArray[2] ? guessArray[2] : guess}/>
             <InputRow answer={answer} guess={guessArray[3] ? guessArray[3] : guess}/>
             <InputRow answer={answer} guess={guessArray[4] ? guessArray[4] : guess}/>
             <InputRow answer={answer} guess={guessArray[5] ? guessArray[5] : guess}/>
             <h1>{isWon ? "You Win!" : null}</h1>
             <h1>{!isWon && guessArray.length > 5 ? "You Lose!" : null}</h1>
        </div>
    );
}

export default Grid;