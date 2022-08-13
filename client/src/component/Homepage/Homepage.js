import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllJourneyByUser from "./AllJourneyByUser/AllJourneyByUser";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import PausedJourney from "./PausedJourney/PausedJourney";
import UserInformation from "./UserInformation/UserInformation";
import { getUserById } from "../../api/api";
import { toast } from "react-toastify";

const Hompage = ({link}) => {
    const navigate = useNavigate();
    const userId = useParams()
    const [User,setUser] = useState({
        "firstName" : "",
        "lastName" : "",
        "role" : [],
        "email" : "",
        "createdAt" : ""
    })

    useEffect(() => {

        if(link === true){
          
            getUserById({"id" : userId.id}).then((Response) => {
         
                setUser(Response.data)

            }).catch(error => {toast(error.message)})
        }

        else{
            setUser(JSON.parse(localStorage.getItem('item')))
        }
        
       
    },[])
    const handleClick = (e) =>{
       
        let list = document.getElementsByClassName('tabs')
    
        for(let i =0;i<list.length;i++){
           
            if(list[i].classList.contains('active')){
                list[i].classList.remove('active')
            }
        }
    
        if(e.target.classList[1] !== 'active'){
            e.target.classList.add('active')

        }
        


    }

    return (
        <>
            <div className="container" >
                <div className="row">
                    <div className="col-3">
                        <i className="fas fa-user fa-10x" style={{ marginTop: "100px", marginLeft: "20px" }} ></i>
                        <p style={{ marginTop: "15px", marginLeft: "33px" }}>{User.firstName + " " +User.lastName}</p>

                    </div>
                    <div className="col-9">
                        <ul className="nav nav-tabs" style={{marginTop : "70px"}}>
                            <li className="nav-item">
                                
                                <Link to="" className="nav-link active tabs"  onClick={handleClick}>All Journeys</Link>
                 
                            </li>
                            <li className="nav-item">
                                <Link to="paused" className="nav-link tabs" onClick={handleClick}>Paused Journeys</Link>
                            
                            </li>
                            <li className="nav-item">
                            <Link to="info" className="nav-link tabs" onClick={handleClick}>User Information</Link>
                                
                            </li>
                        </ul>
                        <div style={{marginTop : "30px"}}>

                        <Routes>
                            <Route exact path ="" element={<AllJourneyByUser link2={link}/>}/>
                            <Route exact path="paused" element={<PausedJourney link2={link} />} />
                            <Route exact path="info" element={<UserInformation link2={link}/>} />    
                        </Routes>
                        
                    </div>
                        


                    </div>

                </div>

            </div>




        </>

    )
}
export default Hompage


