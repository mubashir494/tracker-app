import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Polyline, Marker } from '@react-google-maps/api';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import map from "../../style/map";
import { getTripById } from "../../api/api";
import moment from 'moment'
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { getJourneyByTripId } from "../../api/api"
import { toast } from "react-toastify"

const onLoad = polyline => {
    console.log('polyline: ', polyline)
};
const onload = Marker => {
    console.log('Marker ', Marker)
}
const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 40000,
    zIndex: 1
};
const TripMap = ({ tripId, option }) => {
    let navigate = useNavigate();

    let socket = undefined;
    const [Status, setStatus] = useState({
        mode: "",
        origin: {},
        destination: {},
        startTime: "",
        endTime: "",
        route: []

    })
    const [Options, setOptions] = useState({});
    const [Center, setCenter] = useState({})
    const prevCoordinates = useRef({});
    const [CurrentCoordinates, setCurrentCoordinates] = useState({});


    const Poly = () => {
        useEffect(() => { console.log("Rendering poly") }, [])
        return (
            <>
                {Status.mode[0] === 'ACTIVE' ?
                    <>
                        <Marker onload={onload} position={Status.origin} />
                        <Marker onload={onload} position={(CurrentCoordinates === {} ? prevCoordinates.current : CurrentCoordinates)} />
                    </>
                    :
                    <>
                        <Marker
                            onLoad={onload}
                            position={Status.origin}
                        />

                        <Polyline
                            onLoad={onLoad}
                            path={
                                Status.route
                            }
                            options={options}
                        />
                        <Marker
                            onLoad={onload}
                            position={Status.destination}
                        />
                    </>



                }
            </>


        )
    }


    useEffect(() => {
        if (localStorage.getItem('item')) {
            getJourneyByTripId({ tripId }).then((response) => {
                console.log(response.data)
                if (!response.data) {
                    navigate('/')
                    toast("page Not found")

                }
                else {
                    if (JSON.parse(localStorage.getItem('item')).id === response.data.userId || JSON.parse(localStorage.getItem('item')).role[0] === 'ADMIN') {
                        
                        getTripById({ tripId }).then(response => {
                            if (response.data.status[0] === 'ACTIVE') {
                                const path = []
                                if (response.data.route !== null) {
                                    response.data.route.map((coordinates) => {
                                        const coord = { "lat": coordinates[1], "lng": coordinates[0] }
                                        path.push(coord);
                                    })
                                }
                                setStatus({ "mode": response.data.status, "origin": { "lat": response.data.start[0][1], "lng": response.data.start[0][0] }, "startTime": response.data.startTime, "route": path })

                            }
                            else {
                                const path = [];

                                response.data.route.map((coordinates) => {
                                    const coord = { "lat": coordinates[1], "lng": coordinates[0] }
                                    path.push(coord);
                                })
                                console.log(response.data.start[0])
                                setStatus({ "mode": response.data.status, "origin": { "lat": response.data.start[0][1], "lng": response.data.start[0][0] }, "destination": { "lat": response.data.end[0][1], "lng": response.data.end[0][0] }, "startTime": response.data.startTime, "endTime": response.data.endTime, "route": path })
                            }

                        })

                    }
                    else {
                        navigate('/')
                        toast("Not authorized")
                    }
                }
            }).catch((error) => {
                console.log(error.message)
                
                navigate('/')


            })



        }





    }, [])
    useEffect(() => {
        setOptions({ "path": Status.route, ...options })
        setCenter(Status.origin)
        console.log(Status)
    }, [Status])

    useEffect(() => {
        if (Status.mode[0] === 'ACTIVE') {
            console.log("Active")
            socket = io.connect("http://localhost:4000")
            socket.emit('join-room', tripId);
            console.log("starting...")
            socket.emit('start', tripId)
            socket.on('recieve-first-location', (location) => {
                console.log("first-location")
                setCurrentCoordinates({ "lat": location[1], "lng": location[0] })
            })
            socket.on('recieve-location', (location) => {
                console.log(location)
                setCurrentCoordinates({ "lat": location[1], "lng": location[0] })
            })
        }
    }, [Status])


    useEffect(() => {
        console.log(CurrentCoordinates)
        prevCoordinates.current = CurrentCoordinates
        console.log("Changing prev Coordinates")
        console.log(prevCoordinates.current)
    }, [CurrentCoordinates])


    return (

        <>
            {(option === true) ? <Poly /> :

                <div >
                    <LoadScript
                        googleMapsApiKey="AIzaSyCzaCo3o7Q2c7kzeirvpMdYUvinUaorLN8"
                    >
                        <GoogleMap
                            mapContainerStyle={map}
                            center={Center}
                            zoom={10}
                        >
                            {Status.mode[0] === 'INACTIVE' ?
                                <>
                                    <Marker
                                        onLoad={onload}
                                        position={Status.origin}
                                    />

                                    <Polyline
                                        onLoad={onLoad}
                                        path={
                                            Status.route
                                        }
                                        options={options}
                                    />
                                    <Marker
                                        onLoad={onload}
                                        position={Status.destination}
                                    />
                                </>
                                :
                                Status.mode[0] === 'ACTIVE' ?
                                    <>
                                        <Marker onload={onload} position={(CurrentCoordinates === {} ? prevCoordinates.current : CurrentCoordinates)} />
                                    </>
                                    :
                                    <h1>PLEASE WAIT IT IS LOADING THE LOCATION</h1>
                            }
                        </GoogleMap>
                    </LoadScript>
                    <div className="container my-4">
                        <strong>START DATE</strong> <p style={{ display: "inline", marginLeft: "20px" }}> {moment(Status.startTime).format('YYYY-MM-DD')}</p>
                        <hr />
                        <strong>START TIME</strong> <p style={{ display: "inline", marginLeft: "20px" }}>{moment(Status.startTime).format('hh:mm:ss')}</p><br />
                        <hr />
                        {(Status.mode[0] === 'INACTIVE') ?
                            <><strong>END DATE </strong> <p style={{ display: "inline", marginLeft: "33px" }}>{moment(Status.endTime).format('YYYY-MM-DD')}</p><hr />
                                <strong>END TIME</strong> <p style={{ display: "inline", marginLeft: "33px" }}>{moment(Status.endTime).format('hh:mm:ss')}</p><hr />
                            </>
                            :
                            <></>


                        }
                        <strong>STATUS</strong> <p style={{ display: "inline", marginLeft: "50px" }}>{Status.mode[0]}</p><br />

                    </div>
                </div>
            }
        </>
    )
}
export default TripMap