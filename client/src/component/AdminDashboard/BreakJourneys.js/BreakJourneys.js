import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBreakJourney } from "../../../api/api";
import JoureyCard from "../JourneyCard/JourneyCard";

const BreakJourneys = () => {
    const [Journey,setJourney] = useState([]);
    useEffect(() => {
        getBreakJourney().then((response) => {
    
            setJourney(response.data)

        }).catch((error) => {
            toast(error.message)
        })

    },[])
    return(
        <>
            {
                Journey.length === 0 ? 
                <h1>No Paused Journeys</h1>
                :
                Journey.map((element,index) => (
                    <JoureyCard JourneyObj={element} index= {index} />

                ))
            }
        </>

    )
}
export default BreakJourneys