import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import ContextState from "../Context/ContextState";
// Admin and User Access pages
const ProtectiveRoute = ({children}) =>{
    const context = useContext(ContextState);
 
   if(localStorage.getItem('item')){
    return children
   }
   else{
        return <Navigate to={'/'}/>

   }
}
export default ProtectiveRoute