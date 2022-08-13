import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTripById } from "../../api/api";
import moment from "moment";
const Card = ({ tripId , index }) => {


    const [Trip, setTrip] = useState({
        _id: "",
        start: [],
        end: [],
        startTime: "",
        status: []

    });
    useEffect(() => {
      
        getTripById({tripId}).then(response => {setTrip(response.data)}).catch((error) => toast(error.message))

    }, [])

    return (
        <>
            <div className="card mb-3 my-5" style={{border : "none"}}>
                <div className="card-body">
                    <h5 className="card-title" ><a  href={`/trip/${tripId}`}>{`Phase ${index}`}</a></h5>
                    
                    <p className="card-text">
                        <strong>START TIME</strong> <p style={{ display: "inline", marginLeft: "20px" }}>{moment(Trip.startTime).format('hh:mm:ss')}</p><br />
                        {
                            (Trip.status[0] === 'INACTIVE')? <><strong>END TIME</strong> <p style={{ display: "inline", marginLeft: "20px" }}>{moment(Trip.endTime).format('hh:mm:ss')}</p><br /></>
                            :
                            <></>
                        }

                    </p>
                    <p className="card-text"><small className="text-muted">{Trip.status}</small></p>
                </div>
            </div>
        </>

    )
}
export default Card