import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPausedJourneyById } from "../../../api/api";
import JoureyCard from "../../AdminDashboard/JourneyCard/JourneyCard";
const PausedJourney = ({ link2 }) => {
    const [Journey, setJourney] = useState([])
    const navigate = useNavigate()
    const userId = useParams()
    useEffect(() => {
   
        
        if (link2 === false) {
            if (localStorage.getItem('item')) {
                getPausedJourneyById({ "userId": JSON.parse(localStorage.getItem('item')).id }).then((response) => {
                    setJourney(response.data)
                }).catch((error) => {
                    toast(error.message)
                })
            }
            else {
                toast("Please logIn to access")
            }
        }
        else {
            if(localStorage.getItem('item')){
                if(JSON.parse(localStorage.getItem('item')).role[0] === 'ADMIN'){
                    getPausedJourneyById({ "userId": userId.id }).then((response) => {
                        setJourney(response.data)
                    }).catch((error) => {
                        navigate('/')
                        toast(error.message)
                    })

                }
                else{
                    navigate('/')
                    toast("Admin access required")
                }
            }
            else{
                navigate('/')
                    toast("Admin access required")

            }
            

        }
    }, [])
    return (
        (Journey.length === 0) ?
            <h1>No Paused Journey</h1>
            :
            Journey.map((element, index) => (
                <JoureyCard JourneyObj={element} index={index} />
            ))



    )
}
export default PausedJourney