import mongoose from "mongoose";
import journey from "../model/journey.js";
import  Jwt  from "jsonwebtoken";
export const getJourneyById = async (req,res) => {
    try{
        const journeyId = req.body.journeyId;
        const Jounrney = await journey.findById(journeyId);
        res.status(200).json(Jounrney)

    }catch(error){
        res.status(401).json({"message" : error.message})
    }
}
export const getAllJourney = async (req,res) => {
    try{
        const Journeys = await journey.find();
        res.status(200).json(Journeys)
    }catch(error){
        res.status(401).json({"message" : error.message})
    }
}
export const getActiveJourney = async (req,res) => {
    try{
        const Journey = await journey.find({"status" : ['ACTIVE']});
        res.status(200).json(Journey)
    }
    catch(error){
        res.status(200).json(error.message)
    }
}
export const getBreakJourney = async (req,res) => {
    try{
        const Journey = await journey.find({"status" : ['BREAK']});
        res.status(200).json(Journey)
    }
    catch(error){
        res.status(200).json(error.message)
    }

}
export const getCompletedJourney = async (req,res) =>{
    try{
        const Journey = await journey.find({"status" : ['INACTIVE']});
        res.status(200).json(Journey)
    }
    catch(error){
        res.status(200).json(error.message)
    }

}
export const getCompletedJourneyById = async (req,res) => {
    try{
        const userId = req.body.userId
        
            const Journey = await journey.find({"userId" : userId})
            res.status(200).json(Journey)
        
    }
    catch(error) {
        res.status(401).json({"message" : error.message})
    }
}


export const getPausedJourneyById = async (req,res) => {
    try{
        const userId = req.body.userId;
       
            const journeys = await journey.find({"userId" : userId,"status" : ['BREAK']})
            res.status(200).json(journeys)
        

    }catch(error){
        res.status(401).json(error.message)

    }
}
export const getJourneyByTripId = async (req,res) => {
    try{
        const tripId = req.body.tripId;
        const journeys = await journey.findOne({"trip" : tripId})
        res.status(200).json(journeys)

    }catch(e){
        res.status(401).json({"message" : e.message})
    }
}