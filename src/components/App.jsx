import React from "react";
import Grid from "./Grid";


function App(){
        
    return(
        <div>
        <h1 className="title">Guess The Word</h1>
        <Grid/>
        <a className="refresh" href="/">Refresh</a>
        </div>
    );
}

export default App;