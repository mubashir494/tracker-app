import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JoureyCard from "../../AdminDashboard/JourneyCard/JourneyCard";
import { getCompletedJourneyById } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
const AllJourneyByUser = ({ link2 }) => {
    const navigate = useNavigate();
    const [Journeys, setJourney] = useState([]);
    const [User, setUser] = useState({});

    const userId = useParams();

    useEffect(() => {
        if (link2 === false) {
            if (localStorage.getItem('item')) {
                setUser(JSON.parse(localStorage.getItem('item')))
                getCompletedJourneyById({ "userId": JSON.parse(localStorage.getItem('item')).id }).then(response => {
          
                    setJourney(response.data)
                }).catch(error => {
                    toast(error.message)
                })
            }
            else {
                toast("Please logIn")
            }
        }
        else {
    
            if(localStorage.getItem('item')){
                if(JSON.parse(localStorage.getItem('item')).role[0] === 'ADMIN'){
                    getCompletedJourneyById({ "userId": userId.id }).then(response => {
                        
                        setJourney(response.data)
                    }).catch(error => {
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
        <>
            {
                (Journeys.length === 0) ?
                    <h1>No Journey Completed Till now</h1>
                    :
                    Journeys.map((Element, index) => (
                        <JoureyCard JourneyObj={Element} index={index} />
                    ))
            }
        </>
    )
}
export default AllJourneyByUser