import React, { useState } from "react";
import { isLoggedIn } from "../../api/api";
import ContextState from "./ContextState";

const States = (props) => {
    const [Error, setError] = useState("");
    const [loggedIn,setLoggedIn] = useState(false);

    const checkLoggedIn = () => {
        const item = localStorage.getItem("item")

        if (item) {
            setLoggedIn(true)
            const json = JSON.parse(item)
      
            isLoggedIn(json.token).then((response) => {
     
                setLoggedIn(true)
            }).catch((error) => {
                setLoggedIn(false)
                localStorage.removeItem("item")
            })
        }
        else {
            setLoggedIn(false)
        }
    }
    const message = (message) => {
        if (message != null) {
            setError({ message: message });
        }
        setTimeout(() => {
            setError({ message: "" })

        }, 5000);
    }
    const logout = () => {
        localStorage.removeItem("item")
        setLoggedIn(false)
    }
    const getUserLoggedIn= () =>{
        if(loggedIn === true){
            const item = localStorage.getItem("item")
            return JSON.parse(item)
        }
    }
    return (
        <ContextState.Provider value={{Error,message,loggedIn,setLoggedIn,checkLoggedIn,logout,getUserLoggedIn}}>
            {props.children}
        </ContextState.Provider>
    )
}
export default States;