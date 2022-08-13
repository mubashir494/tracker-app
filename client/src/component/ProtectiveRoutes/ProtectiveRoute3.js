import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ContextState from "../Context/ContextState";
// only non loggedIn user
const ProtectiveRoute3 = ({children}) => {
    const context = useContext(ContextState)
    const navigate = useNavigate();
    if(!localStorage.getItem('item')){
        return children
    }else{
        return <Navigate to={'/'}/>
    }

}
export default ProtectiveRoute3