import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJourneyById } from "../../../api/api";
import moment from "moment";
const JoureyCard = ({JourneyObj,index}) => {
    const [Journey,setJourney] = useState({
        _id : "",
        userId : "",
        startCoordinates : [],
        endCoordinates : [],
        startTime : "",
        status : [],
        endTime : "",
        trip : []
    })
    useEffect(() => {
  
        setJourney(JourneyObj)
        
    },[Journey])

    return (
        <div className="card mb-3">
                <div className="card-body">
                <h5 className="card-title" ><a  href={`/journey/${Journey._id}`}>{`Journey ${index+1}`}</a></h5>
                <strong>START TIME</strong> <p style={{ display: "inline", marginLeft: "20px" }}>{moment(Journey.startTime).format('hh:mm:ss')}</p><br />
                        {
                            (Journey.status[0] === 'INACTIVE')? <><strong>END TIME</strong> <p style={{ display: "inline", marginLeft: "20px" }}>{moment(Journey.endTime).format('hh:mm:ss')}</p><br /></>
                            :
                            <></>
                        }
                    <p className="card-text"><small className="text-muted">{Journey.status[0]}</small></p>
                </div>


        </div>

    )
}
export default JoureyCard