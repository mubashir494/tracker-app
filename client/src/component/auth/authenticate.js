import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getUserById, authenticateUser } from "../../api/api"
const Authenticate = () => {
    const obj = useParams()
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserById({ "id": obj.id }).then((response) => {
            setUser(response.data)

        }).catch(error => {
            toast(error.message)
        })

    }, [])

    const auth = () => {
        authenticateUser({ "userId": obj.id }).then((response) => {
            setUser({"auth": true,"firstName" : user.firstName,"lastName": user.lastName,"email" : user.email})
            toast("Authenticated the user successfully")
        }).catch(error => toast(error.message))

    }
    return (

        <div className="container my-4" style={{textAlign : "center"}}>
            <div >
                <h1 >User Detail</h1>
                <h3>First Name : {user.firstName} </h3><br />
                <h3>Last Name : {user.lastName}</h3><br />
                <h3>Email : {user.email}</h3>

            </div>
            {(user.auth === false) ?
                <button className="btn btn-primary my-2" onClick={auth}>
                    Authenticate the User
                </button>
                :
                <h1>Authenticated User</h1>
            }


        </div>

    )
}
export default Authenticate