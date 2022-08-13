import express from "express" 
import {createStatus,addJourney,updateStatus,updateCurrentJourney,updateCurrentTrip,getStatusByuserId,getAllUserStatus} from "../controller/status.js"
const router = express.Router();
router.post('/createStatus',createStatus)
router.post('/addJourney',addJourney)
router.post('/updateStatus',updateStatus)
router.post('/updateCurrentJourney',updateCurrentJourney)
router.post('/updateCurrentTrip',updateCurrentTrip)
router.post('/getStatusByuserId',getStatusByuserId);
router.post('/getAllUserStatus',getAllUserStatus)
export default router