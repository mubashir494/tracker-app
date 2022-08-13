import express from "express";
import {getJourneyById,getAllJourney,getActiveJourney,getBreakJourney,getCompletedJourney,getCompletedJourneyById,getPausedJourneyById,getJourneyByTripId } from "../controller/journey.js";
import { startJourney,breakJourney,resumeJourney,endJourneys } from "../controller/nested.js";
import { authenticate,authenticateAdmin } from "../middleware/authenticate.js";
const router = express.Router();


// Admin Access
router.post('/getAllJourney',getAllJourney)
router.post('/getActiveJourney',getActiveJourney)
router.post('/getBreakJourney',getBreakJourney)
router.post('/getCompletedJourney',getCompletedJourney)



// Only Current and Admin Access
router.post('/getCompletedJourneyById',getCompletedJourneyById)
router.post('/getJourneyById',getJourneyById)
router.post('/getPausedJourneyById',getPausedJourneyById)




router.post('/getJourneyByTripId',getJourneyByTripId)



// User and Admin Access
router.post('/startJourney',startJourney)
router.post('/breakJourney',breakJourney)
router.post('/resumeJourney',resumeJourney)
router.post('/endJourneys',endJourneys)
export default router
