import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContextState from "../Context/ContextState";
const Navbar = () => {
    const context = useContext(ContextState)
    const navigate = useNavigate()
    const logout = () => {
        context.logout()
        navigate('/login')
    }

    const clickHandler = (e) => {
        const item  = document.getElementsByClassName('nav-item')
        for(let i =0 ;i<item.length ;i++){
            
            if(item[i].classList.contains('active')){
                item[i].classList.remove('active')
            }
 
        }
        if(!e.target.parentNode.classList.contains('active')){
            e.target.parentNode.classList.add('active')
        }
       
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Tracker</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    {(context.loggedIn === true)?

                        (JSON.parse(localStorage.getItem('item')).role[0] === 'ADMIN') ?
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" onClick={clickHandler} to="/homepage">Home <span class="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={clickHandler} to="/dashBoard">Dashboard </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={clickHandler} to="/startMenu">Start</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" onClick={clickHandler} to="/homepage">Home <span class="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={clickHandler} to="/startMenu">Start</Link>
                                </li>
                            </>
                        :
                        <>
                        </>


                
                    }
                    


                </ul>
                <form className="form-inline my-2 my-lg-0">
                    {(context.loggedIn === false)?
                        <>
                        <Link type="button" to="/login" className="btn btn-dark">Login</Link>
                        <Link type="button" to="/register " className="btn btn-dark mx-4">Register</Link>
                        </>
                        :
                        <Link type="button" onClick={logout} to="/login" className="btn btn-dark">Logout</Link>

                    }
                </form>
            </div>
        </nav>


    )
}
export default Navbar