import express from "express";
import {createTrip,addRoute,changestatus,endTrip,getTripById} from "../controller/trip.js"
const router = express.Router();
router.post('/createTrip',createTrip)
router.post('/addRoute',addRoute)
router.post('/changestatus',changestatus)
router.post('/endTrip',endTrip)
router.post('/getTripById',getTripById)

export default router