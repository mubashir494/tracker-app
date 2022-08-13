import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllJourney } from "../../../api/api";
import JoureyCard from "../JourneyCard/JourneyCard";

const AllJourney = () => {
    const [Journey,setJourney] = useState([]);
    useEffect(() =>{
      
        getAllJourney().then(response => {
            setJourney(response.data)

        }).catch(error => {
            toast(error.message)
        })

    },[])
    return(
        <>
        {Journey.length === 0 ? <h1>NO Journey have been done till now !</h1> 
        : 
        Journey.map((element,index) => (
            <JoureyCard JourneyObj={element} index={index}/>
        ))
    
    }
    </>

    )
}
export default AllJourney