import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUserStatus } from "../../../api/api";
import UserStatusCard from "./UserStatusCard";
const UserStatus = () =>{ 
    const [Status,setStatus] = useState([]);
    useEffect(() => {
        getAllUserStatus().then(response => {
           
            setStatus(response.data)
        }).catch(error => {
            toast(error.message)
        })
    },[])



    return(
        <>
        {
            (Status.length === 0)? 
            <h1>NO Users Found</h1>
            :
            Status.map((element,index) =>(
                <UserStatusCard status={element} index={index}/>
            ))

        }
        </>
    )
}
export default UserStatus