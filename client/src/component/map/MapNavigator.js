import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TripMap from "./tripMap";
const MapNavigator = () =>{
    const tripId = useParams();
    return(
        <TripMap tripId={tripId.id} option={false}/>
    )
}
export default MapNavigator