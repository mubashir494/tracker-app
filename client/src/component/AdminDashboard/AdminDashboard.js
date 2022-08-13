import React from "react";
import AllJourney from "./AllJourney/AllJourney";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import ActiveJourneys from "./ActiveJourneys/ActiveJourneys";
import BreakJourneys from "./BreakJourneys.js/BreakJourneys";
import UserStatus from "./UserStatus/UserStatus";
import ProtectiveRoute2 from "../ProtectiveRoutes/ProtectiveRoute2";
const AdminDashboard = () => {
    return (
        <div className="container" style={{ marginLeft: "50px", marginTop: "30px" }}>

            <div className="row">
                <div className="col-3">
                    <nav className="nav flex-column ">
                    <Link to='/dashBoard' className="nav-link"> All Journeys</Link>
                        <Link to='/dashBoard/active' className="nav-link"> Active Journeys</Link>
                        <Link to='/dashBoard/break' className="nav-link"> Paused Journeys</Link>
                        <Link to='/dashBoard/status' className="nav-link">User Status</Link>
                        
                    </nav>
                </div>
                <div className="col-9" >
                    <Routes>
                        <Route exact path="" element={<ProtectiveRoute2><AllJourney /></ProtectiveRoute2>} />
                        <Route exact path="active" element={<ProtectiveRoute2><ActiveJourneys /></ProtectiveRoute2>} />
                        <Route exact path="break" element={<ProtectiveRoute2><BreakJourneys/></ProtectiveRoute2>} />
                        <Route exact path="status" element={<ProtectiveRoute2><UserStatus/></ProtectiveRoute2>} />
                    </Routes>

                </div>
            </div>
        </div>
    )
}
export default AdminDashboard