import React,{useState,useContext} from "react";
import ContextState from "../Context/ContextState";
import { validEmail,validPassword } from "../../helper/Regex";
import { createStatus, registerUser,sendEmail } from "../../api/api";
import {toast} from "react-toastify"


const Register = () => {
    const URL = "http://localhost:3000";
    const [firstName, setFirstName] = useState({firstName : "",valid : 0})
    const [lastName, setLastName] = useState({lastName : "",valid : 0});
    const [email, setEmail] = useState({email : "",valid : 0})
    const [password, setPassword] = useState({password : "",valid : 0})
    const context = useContext(ContextState);


    const handleFirstName = (event) => {
        let text = event.target.value;
        
        if (text.split(" ").length === 1 && (text.length<=20 && text.length>=2)) {
      
            setFirstName({
                firstName : text,
                valid : 1
            })
        }
        else{
            setFirstName({
                firstName : text,
                valid : 0
            })
        }
    }

    const handleLastName = (event) => {
        let text = event.target.value;
    
        if (text.split(" ").length === 1 && (text.length<=20 && text.length>=2)) {
    
            setLastName({
                lastName : text,
                valid : 1
            })
        }
        else{
            setLastName({
                lastName : text,
                valid : 0
            })
        }
    }
    const handleEmail = (event) => {
        let text = event.target.value;

        if (validEmail.test(text)) {
            setEmail({
                email : text,
                valid : 1
            })
        }
        else{
    
            setEmail({
                email : text,
                valid : 0
            })
        }
    }
    const handlePassword = (event) => {
        let text = event.target.value;
        if (validPassword.test(text)) {

            setPassword({
                password : text,
                valid : 1
            })
        }
        else{

            setPassword({
                password : text,
                valid : 0
            })
        }
    }
    const onclickHandler = (e) => {
        
        e.preventDefault();
        if(firstName.valid === 1 && lastName.valid === 1 && email.valid === 1 && password.valid === 1){
            const users = {
                firstName : firstName.firstName,
                lastName : lastName.lastName,
                email : email.email,
                password : password.password,
                
            }
            registerUser(users).then((response) => {
                if(response.status === 200){
                    const obj = {"userId" : response.data.id,"status" : ['INACTIVE']}
                    createStatus(obj).then((response) =>{
                      
                    }).catch(error => {console.log(error.message)})

                    const link = `${URL}/auth/${response.data.id}`                    
                 
                    sendEmail({link,...response.data}).then(response => {
                     
                        toast("Registration Request has been sent")
                    })

                }

                
            }).catch((errors)=>{
                if(errors.response){
                    toast(errors.response.data.message)
                    
                }
                else{
                  
                    toast(errors.message)
                }
            })
        }else{
            toast("Invalid Inputs")
            
        }
    }
    return (
        <section className="vh-100" style ={{backgroundColor : "#eee"}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11 my-5">
                        <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw mx-3"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" onChange={handleFirstName} id="form3Example1c" className="form-control" placeholder="First Name"/>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw mx-3"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" onChange={handleLastName} className="form-control" placeholder="Last Name"/>
                                                    
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw mx-3"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" onChange={handleEmail} id="form3Example3c" className="form-control" placeholder="Email" />
                                                  
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw mx-3"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" onChange={handlePassword} id="form3Example4c" className="form-control" placeholder="password"/>
                                                
                                                </div>
                                            </div>

                                            

                                

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={onclickHandler}>Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register