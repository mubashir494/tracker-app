import Navbar from "./component/Navbar/Navbar";
import StartMenu from "./component/UserDashboard/StartMenu"
import Login from "./component/login/Login"
import Register from "./component/register/Register";
import TripMap from "./component/map/tripMap"
import Authenticate from "./component/auth/authenticate";
import JourneyMap from "./component/map/journeyMap";
import MapNavigator from "./component/map/MapNavigator";
import LandingPage from "./component/Homepage/LandingPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import Hompage from "./component/Homepage/Homepage";
import { useContext, useEffect } from "react";
import ContextState from "./component/Context/ContextState";
import ProtectiveRoute from "./component/ProtectiveRoutes/ProtectiveRoute";
import ProtectiveRoute2 from "./component/ProtectiveRoutes/ProtectiveRoute2";
import ProtectiveRoute3 from "./component/ProtectiveRoutes/ProtectiveRoute3";
import axios from "axios";




function App() {
  const context = useContext(ContextState);
  useEffect(() => {
    context.checkLoggedIn();
  }, [])
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/user/:id/*" element={<ProtectiveRoute2><Hompage link={true} /></ProtectiveRoute2>} />
          <Route exact path="/homepage/*" element={<ProtectiveRoute><Hompage link={false} /></ProtectiveRoute>} />
          <Route exact path="/dashBoard/*" element={<ProtectiveRoute2><AdminDashboard /></ProtectiveRoute2>} />
          <Route exact path="/startMenu" element={<ProtectiveRoute><StartMenu /></ProtectiveRoute>} />
          <Route exact path="/login" element={<ProtectiveRoute3><Login /></ProtectiveRoute3>} />
          <Route exact path="/trip/:id" element={<ProtectiveRoute><MapNavigator /></ProtectiveRoute>} />
          <Route exact path="/register" element={<ProtectiveRoute3><Register /> </ProtectiveRoute3>} />
          <Route exact path="/auth/:id" element={<ProtectiveRoute2><Authenticate /></ProtectiveRoute2>} />
          <Route exact path="/journey/:id" element={<ProtectiveRoute><JourneyMap /></ProtectiveRoute>} />

        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />
      <div className="bg-dark" style={{ height: "50px",position : "fixed",bottom : "0px" ,width : "100%", }}>
      </div>


    </>
  );
}

export default App;
