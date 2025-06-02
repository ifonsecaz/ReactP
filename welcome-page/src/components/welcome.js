import React, {useEffect, useState } from 'react'
import './welcome.css';

const Welcome = (props) => {
    const [darkMode,setDarkMode] = useState(true);
    const [classDarkMode,setClassDarkMode] = useState("App-header");
    const [time, setTime] = useState(new Date());
    const [welcomeMessage, setWelcomeMessage] = useState(()=>{
        let hour=time.getHours();
        let res;
        if(hour>=5 && hour<12){
            res="Good Morning!";
        }
        else if(hour>=12 && hour<17){
            res="Good Afternoon!";
        }
        else if(hour>=17 && hour<21){
            res="Good Evening!";
        }
        else{
            res="Good Night!";
        }
        return res;
    });
    
    useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
        }, 1000);
        message(time);
        return () => clearInterval(interval);
    }, []);

    const message = (time) =>{
        let hour=time.getHours();
        if(hour>=5 && hour<12){
            setWelcomeMessage("Good Morning!");
        }
        else if(hour>=12 && hour<17){
            setWelcomeMessage("Good Afternoon!");
        }
        else if(hour>=17 && hour<21){
            setWelcomeMessage("Good Evening!");
        }
        else{
            setWelcomeMessage("Good Night!");
        }

    }

    const toggleDarkMode=()=>{
        if(darkMode){
            setClassDarkMode("App-headerW");
            setDarkMode(false);
        }else{
            setClassDarkMode("App-header");
            setDarkMode(true);
        }
    }


    return (
        <>
        <header className={classDarkMode}>
            <h1>Hello, {props.name} from {props.location}! Welcome to our platform
            </h1>
            <h2>{welcomeMessage}</h2>
            <h3>Current time: {time.toLocaleTimeString()} </h3>
            <div>
                <button type="button" className="grey-btn" onClick={toggleDarkMode}>{darkMode?"Light Mode":"Dark Mode"}</button> 
            </div>
        </header>
        
        </>);
};

export default Welcome;