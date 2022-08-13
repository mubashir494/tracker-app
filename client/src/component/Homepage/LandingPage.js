import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('item')) {
            const user = JSON.parse(localStorage.getItem('item'))
       

            if (user.role[0] === 'ADMIN') {
      
                navigate('/homepage')
            }
            else {
       
                navigate('/homepage')

            }
        }
        else {
            navigate('/login')

        }
    }, [])
    return(
        <>
        <h1>Landing page</h1>
        </>

    )
}
export default LandingPage