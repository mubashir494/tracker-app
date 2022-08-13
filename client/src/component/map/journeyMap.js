import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Polyline, Marker } from '@react-google-maps/api';
import { getJourneyById, getUserById } from "../../api/api";
import { toast } from "react-toastify";
import TripMap from "./tripMap";
import map2 from "../../style/map2";
import moment from "moment";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";





const JourneyMap = () => {
    const journeyId = useParams()
    const navigate = useNavigate();
    const [Journey, setJourney] = useState({
        _id: "",
        userId: "",
        startCoordinates: [],
        endCoordinates: [],
        startTime: "",
        status: [],
        trip: []

    })
    const [User, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "email": ""
    })
    const [Center, setCenter] = useState({});
    useEffect(() => {

        getJourneyById({ "journeyId": journeyId.id }).then((response) => {
      
            if(response.data){
                if(response.data.userId === JSON.parse(localStorage.getItem('item')).id || JSON.parse(localStorage.getItem('item')).role[0] === 'ADMIN'){
                    
                    setJourney(response.data)
                    getUserById({ "id": response.data.userId }).then((response) => {
        
                        setUser(response.data)
                    }).catch(error => {
                 
                        toast(error.message)
                    })
                 
        
                    setCenter({ "lat": response.data.start[0][1], "lng": response.data.start[0][0] })

                }
                else{
                    toast("Not allowed")
                    navigate('/')

                }



            }
            else{

                toast("page Not available")
                navigate('/')
            }



        }).catch(error => { toast(error.message)})
    }, [])



    return (
        <>


            <h1 style={{ "marginLeft": "57px", "marginTop": "30px" }}>Overall Journey</h1>

            <LoadScript
                googleMapsApiKey="AIzaSyCzaCo3o7Q2c7kzeirvpMdYUvinUaorLN8"
            >
                <GoogleMap
                    mapContainerStyle={map2}
                    center={Center}
                    zoom={10}
                >
                    {(Journey.trip !== undefined) ?
                        Journey.trip.map(element => (

                            <TripMap tripId={element} option={true} />
                        ))
                        :
                        <></>

                    }

                </GoogleMap>

            </LoadScript>

            <div className="container my-5">
                <strong>Name</strong> <p style={{ display: "inline", marginLeft: "65px" }}> {User.firstName + " " + User.lastName}</p>
                <hr />

                <strong>START DATE</strong> <p style={{ display: "inline", marginLeft: "20px" }}> {moment(Journey.startTime).format('YYYY-MM-DD')}</p>
                <hr />
                <strong>START TIME</strong> <p style={{ display: "inline", marginLeft: "20px" }}>{moment(Journey.startTime).format('hh:mm:ss')}</p><br />
                <hr />
                {(Journey.status[0] === 'INACTIVE') ?
                    <>
                        <strong>END DATE </strong> <p style={{ display: "inline", marginLeft: "33px" }}>{moment(Journey.endTime).format('YYYY-MM-DD')}</p>
                        <hr />
                        <strong>END TIME</strong> <p style={{ display: "inline", marginLeft: "33px" }}>{moment(Journey.endTime).format('hh:mm:ss')}</p>
                        <hr />
                    </>
                    :
                    <></>
                }
                <strong>STATUS</strong> <p style={{ display: "inline", marginLeft: "50px" }}>{Journey.status[0]}</p><br />
                <hr />
                <strong>Breaks Taken</strong> <p style={{ display: "inline", marginLeft: "50px" }}>{Journey.trip.length - 1}</p><br />
                <hr />
                <strong>No of Phases</strong> <p style={{ display: "inline", marginLeft: "50px" }}>{Journey.trip.length}</p><br />


            </div>
            <div style={{ marginLeft: "40px" }} >


                {
                    Journey.trip.map((element, index) => (
                        <Card tripId={element} index={index + 1} />
                    ))
                }
            </div>
        </>


    )
}
export default JourneyMap