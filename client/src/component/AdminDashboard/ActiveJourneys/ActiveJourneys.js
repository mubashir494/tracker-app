import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getActiveJourney } from "../../../api/api";
import JoureyCard from "../JourneyCard/JourneyCard";
const ActiveJourneys = () => {
    const [Journey,setJourneys] = useState([]);
    useEffect(() =>{
        getActiveJourney().then(response =>{
       
            setJourneys(response.data)

        }).catch(error => {toast(error.message)})

    },[])
    return(
        <>
        {
            (Journey.length === 0) ? <h1>No active Journeys</h1>
            :
            Journey.map((element,index) => (
                <JoureyCard JourneyObj={element} index={index}/>
            ))
        }
        </>

    )
}
export default ActiveJourneys