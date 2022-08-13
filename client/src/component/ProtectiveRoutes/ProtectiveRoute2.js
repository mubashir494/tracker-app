import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ContextState from "../Context/ContextState";
// Admin access only

const ProtectiveRoute2 = ({children}) => {  
    const context = useContext(ContextState);
    const navigate = useNavigate();
    if(localStorage.getItem('item')){
        if(JSON.parse(localStorage.getItem('item')).role[0] === 'ADMIN'){
                return children
        }
        else{
            return <Navigate to={'/'}/>

        }

    }
    else{
        return <Navigate to={'/'}/>
    }
    

}
export default ProtectiveRoute2