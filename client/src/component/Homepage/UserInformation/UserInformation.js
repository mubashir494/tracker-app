import React, { useEffect, useState } from "react";
import { getUserById } from "../../../api/api";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UserInformation = ({ link2 }) => {
    const navigate = useNavigate()
    const userId = useParams();
    const [User, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "role": [],
        "email": "",
        "createdAt": ""
    });
    useEffect(() => {
        if (link2 === false) {
            if (localStorage.getItem('item')) {
                setUser(JSON.parse(localStorage.getItem('item')))
            }
        }
        else {
            if(localStorage.getItem('item')){
                if(JSON.parse(localStorage.getItem('item')).role[0] === 'ADMIN'){
                    getUserById({ "id": userId.id }).then((response) => { 
                        setUser(response.data) 
           
                    }).catch(error => {
                        navigate('/')
                         toast(error.message)
                        
                        })

                }
                else{
                    toast('Admin access required')
                    navigate('/')

                }
            }
            else{
                toast('Admin access required')
                navigate('/')

            }
        }

    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <strong>First Name</strong>
                        <br />
                        <br />
                        <strong>Last Name</strong>
                        <br />
                        <br />
                        <strong>Email</strong>
                        <br />
                        <br />
                        <strong>Role</strong>
                        <br />
                        <br />
                        <strong>Created at</strong>
                        <br />
                        <br />
                    </div>
                    <div className="col-9">
                        <p style={{ marginLeft: "50px", display: "inline" }}>{User.firstName}</p>
                        <br />
                        <br />
                        <p style={{ marginLeft: "50px", display: "inline" }}>{User.lastName}</p>
                        <br />
                        <br />
                        <p style={{ marginLeft: "50px", display: "inline" }}>{User.email}</p>
                        <br />
                        <br />
                        <p style={{ marginLeft: "50px", display: "inline" }}>{User.role[0]}</p>
                        <br />
                        <br />
                        <p style={{ marginLeft: "50px", display: "inline" }}>{moment(User.createdAt).format('YYYY-MM-DD')}</p>



                    </div>


                </div>

            </div>
        </>

    )
}
export default UserInformation