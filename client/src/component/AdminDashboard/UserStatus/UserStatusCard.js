import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserById } from "../../../api/api";
import { Link } from "react-router-dom";
const UserStatusCard = ({status}) => {
    const [Status,setStatus] = useState({});
   const [User,setUser] = useState({
    "firstName" : "",
    "lastName" : "",
    "email" : ""
   });

    useEffect(() => {
        setStatus(status)
  
        getUserById({id : status.userId}).then((response) => {
            setUser(response.data)

        }).catch(error => toast(error.message))
    },[])
    return(

    <>
            <div className="card mb-3 my-5" >
                <div className="card-body">
                    <Link to={`/user/${status.userId}`} ><h5 className="card-title" >{User.firstName + " " + User.lastName}</h5></Link>
                    
                    <p className="card-text">
                        {
                            (status.currentJourney  === undefined) ? <strong>Not Started</strong>
                            :
                            <Link to={`/journey/${status.currentJourney[0]}`}><strong>CURRENT JOURNEY / LAST COMPLETED JOURNEY</strong></Link>

                        }

                    </p>
                    <p className="card-text"><small className="text-muted">{status.status[0]}</small></p>
                </div>
            </div>
        </>
    )

}
export default UserStatusCard