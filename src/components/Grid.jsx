import React, {useEffect, useState} from "react";
import InputRow from "./InputRow";
import _ from "lodash";
import wordleWordlist from "wordle-wordlist";

let colorArray = [];
let guessCounter = 0;

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
        });

        
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

            let colors = new Array(5);

            for (let i = 0; i < 5; i++) {
                for(let j = 0; j<5; j++){
                    if(_.lowerCase(guess[i])===answer[i]){
                        colors[i] = "green";
                    } else if(answer.includes(_.lowerCase(guess[i])) ){
                        colors[i] = "yellow";
                    }else{
                        colors[i] = "#232D3F";
                    }
                }
            }
            colorArray[guessCounter] = colors;
            console.log(colorArray);
            console.log(guess);
            guessCounter++;
            setGuess(""); 
        }
    }    

        useEffect(()=>{
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [guess]);
   

    return(
        <div>
             <InputRow colors={colorArray[0]} answer={answer} guess={guessArray[0] ? guessArray[0] : guess}/>
             <InputRow colors={colorArray[1]} answer={answer} guess={guessArray[1] ? guessArray[1] : guess}/>
             <InputRow colors={colorArray[2]} answer={answer} guess={guessArray[2] ? guessArray[2] : guess}/>
             <InputRow colors={colorArray[3]} answer={answer} guess={guessArray[3] ? guessArray[3] : guess}/>
             <InputRow colors={colorArray[4]} answer={answer} guess={guessArray[4] ? guessArray[4] : guess}/>
             <InputRow colors={colorArray[5]} answer={answer} guess={guessArray[5] ? guessArray[5] : guess}/>
             <h1>{isWon ? "You Win! The Word Was: " + _.upperCase(answer) : null}</h1>
             <h1>{!isWon && guessArray.length > 5 ? "You Lose! The Word Was: " + _.upperCase(answer)  : null}</h1>
        </div>
    );
}

export default Grid;