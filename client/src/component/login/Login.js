import React, { useState,useContext } from "react";
import { login } from "../../api/api";
import ContextState from "../Context/ContextState";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../css/Login.css"

const Login = () => {
  const [Email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  const context = useContext(ContextState);
  const navigate = useNavigate();

  const emailHandler = (e) =>{
    setEmail(e.target.value)
  }
  const passwordHandler = (e) =>{
    setPassword(e.target.value)
  }
  const userLogin = () =>{

      login({"email" : Email,"password" : Password}).then((response) => {
      
        localStorage.setItem('item',JSON.stringify(response.data))
        context.setLoggedIn(true)
        navigate("/homepage")
        toast("Successfully Logged In")
        

      }).catch((error) =>{
        if (error.response) {
        toast(error.response.data.message);
        } else if (error.request) {
          toast("The request was made but no response was received");
        } else {
          toast(error.message);
        }
      }
      ) 
  }
  
  return (
    <section className="vh-100" style={{"marginTop" : "100px"}} >
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form >
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Email address" onChange={emailHandler}/>
      
              </div>

              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Password" onChange={passwordHandler} />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-dark btn-lg"
                  style={{ "paddingLeft": "2.5rem", "paddingRight": "2.5rem" }} onClick={userLogin}>Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                  className="link-danger">Register</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
     
    </section>

  )
}
export default Login;