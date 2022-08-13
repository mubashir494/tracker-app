import React, { useEffect, useState, useContext, CSSProperties } from "react";
import ContextState from "../Context/ContextState";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import { getStatusByuserId,startJourney,breakJourney, resumeJourney,endJourn} from "../../api/api"
let interval = undefined


const StartMenu = () => {
    const context = useContext(ContextState);
    const States = ["ACTIVE", "INACTIVE", "BREAK"]


    let socket = undefined

    const [userStatus, setUserStatus] = useState({
        "userId": "",
        "status": [],
        "currentJourney": [],
        "currentTrip": []
    })
    const [loading, setloading] = useState(false)

    // Will run whenever the page will reload
    useEffect(() => {
        if (localStorage.getItem('item')) {
            const user = JSON.parse(localStorage.getItem('item'))
            getStatusByuserId({ "userId": user.id }).then(response => {
                console.log(response.data)
                setUserStatus({
                    userId: user.id,
                    status: response.data.status,
                    currentJourney: response.data.currentJourney,
                    currentTrip: response.data.currentTrip
                })
                console.log(userStatus)

            }).catch(error => {
                console.log(error.message)
            })
        }
    }, [])

    useEffect(() => {
        let interval = undefined;
        if (userStatus.status[0] === States[0]) {
            socket = io.connect("http://localhost:4000")
            socket.emit('join-room', userStatus.currentTrip)

            socket.on('give-location', () => {

                console.log("giving first location")
                navigator.geolocation.getCurrentPosition((position) => {
                    socket.emit('first-location', { "userId": userStatus.userId, "journeyId": userStatus.currentJourney, "tripId": userStatus.currentTrip, "location": [position.coords.longitude, position.coords.latitude] })
                })
            })
            interval = setInterval(() => {
                
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log("emitting")
                    socket.emit('sendLocation', { "userId": userStatus.userId, "journeyId": userStatus.currentJourney, "tripId": userStatus.currentTrip, "location": [position.coords.longitude, position.coords.latitude] })
                },() => {console.log("Taking long")},{timeout : 10000})
            }, 10000);
            console.log(interval)
        }
        return () => clearInterval(interval)
    }, [userStatus])



    // START BUTTON FUNCTION 
    const startButton = () => {
        setloading(true)
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude)
            const obj = { "start": [[position.coords.longitude, position.coords.latitude]], "userId": userStatus.userId, "status": States[0] }
            console.log(obj)
            startJourney(obj).then(response => {
                setUserStatus({"userId" :userStatus.userId,"status" : [States[0]],"currentJourney" : response.data.currentJourney,"currentTrip" : response.data.currentTrip})
                setloading(false)
            })

        },() => {
            setloading(false)
            toast("Please try Again")
        },{timeout : 10000})
        console.log("geo")

    }

    // BREAK BUTTON FUNCTION
    const breakButton = () => {
        setloading(true)
        console.log("break button")
        navigator.geolocation.getCurrentPosition((position) => {
            const obj = { "userId" :userStatus.userId , "end": [[position.coords.longitude, position.coords.latitude]], "currentJourney": userStatus.currentJourney , "currentTrip": userStatus.currentTrip, "status" : States[2] }
            breakJourney(obj).then(response => {
                setUserStatus({ "status": [States[2]], "currentTrip": userStatus.currentTrip, "currentJourney": userStatus.currentJourney, "userId": userStatus.userId })
                setloading(false)
            })
        },() => {
            setloading(false)
            toast('Please try Again')},{timeout : 10000})

       console.log("break")
    }
          // "userId" : "62a20a009ff91f058111e977",
    // "currentJourney" : "62c080bc7324284b5f419880",
    // "currentTrip" : "62c080c17324284b5f419883",
    // "status" : "BREAK",
    // "end" : [[67.0334976,24.838144]]

    const resumeButton = () => {
        
        setloading(true)
        navigator.geolocation.getCurrentPosition((position) => {
            const obj = { "start": [[position.coords.longitude, position.coords.latitude]],"status" : States[0], "currentJourney" : userStatus.currentJourney,"userId" : userStatus.userId}
            resumeJourney(obj).then(response => {
                console.log(response.data)
                setUserStatus({ "status": [States[0]], "currentTrip": response.data.tripId , "currentJourney": userStatus.currentJourney, "userId": userStatus.userId })
                toast("Journey have been resumed")
                setloading(false)
            })

        },() => {
            setloading(false)
            toast("please try Again")
        },{timeout : 10000})
   

    }
  
    // END BUTTON FUNCTION

    const endButton = () => {
        console.log("endButton")
        setloading(true)
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.longitude)
            const obj = {"end": [[position.coords.longitude, position.coords.latitude]],"status" : States[1],"currentTrip" : userStatus.currentTrip,"currentJourney" : userStatus.currentJourney,"userId" : userStatus.userId}
            endJourn(obj).then(response => {
                console.log(response.data)
                setUserStatus({ "status": [States[1]], "currentJourney": userStatus.currentJourney, "currentTrip": userStatus.currentTrip, "userId": userStatus.userId })
                setloading(false)
                toast("Journey have been ended")

            })

        },() => {
            setloading(false)
            toast("please try again")
        },{timeout : 10000})
    
    }






    // Will run whenever the status gets Active 
    // const sendingLocation = () => {
    //     socket = io.connect("http://localhost:4000")
    //     interval = setInterval(() => {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             console.log(userStatus)
    //             console.log("emitting")
    //             socket.emit('sendLocation', { "userId": userStatus.userId, "journeyId": userStatus.currentJourney, "tripId": userStatus.currentTrip, "location": [position.coords.longitude, position.coords.latitude] })
    //         })
    //     }, 3000);
    //     console.log(interval)
    // }


    return (
        <div className="container my-5">
            <h1 className="text-center">
                Do you want to Start the Day
            </h1>
            <div className="text-center my-5">
                <ClipLoader loading={loading} size={150} />

                {
                    loading === true ?
                        <></>
                        :
                        userStatus.status[0] === States[0] ?
                            <>
                                <button className="btn btn-primary btn-lg mx-5" style={{ width: "150px" }} onClick={endButton}>
                                    END
                                </button>
                                <button className="btn btn-primary btn-lg mx-5" style={{ width: "150px" }} onClick={breakButton}>
                                    BREAK
                                </button>
                            </>
                            :
                            userStatus.status[0] === States[1] ?
                                <button className="btn btn-primary btn-lg" onClick={startButton} style={{ width: "150px" }}>
                                    START
                                </button>
                                :
                                userStatus.status[0] === States[2] ?
                                    <>
                                        <button className="btn btn-primary btn-lg mx-5" style={{ width: "150px" }} onClick={resumeButton}>
                                            Resume
                                        </button>
                                        <button className="btn btn-primary btn-lg mx-5" style={{ width: "150px" }} onClick={endButton}>
                                            END
                                        </button>
                                    </>
                                    :
                                    <h1>PLEASE WAIT</h1>
                }
                {console.log(userStatus)}
            </div>
        </div>
    )
}
export default StartMenu