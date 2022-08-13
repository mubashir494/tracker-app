import journey from "../model/journey.js"
import trip from "../model/trip.js"
import status from "../model/status.js"

// const obj = { "start": [[position.coords.longitude, position.coords.latitude]], "userId": userStatus.userId, "status": States[0] }
export const startJourney = async (req,res) => {
    try{

        const obj = req.body;
        const time = new Date()
        const newjourney = await journey.create({"startTime" : time,...obj})
        const newTrip = await trip.create({"startTime" : new Date(),"route" : obj.start,...obj})
        const addTrip = await journey.findOneAndUpdate({_id : newjourney._id},{ $push: { trip: [newTrip._id] }})
        const updateStatus = await status.findOneAndUpdate({"userId" : obj.userId},{"status" : obj.status ,"currentJourney":newjourney._id,"currentTrip" : newTrip._id})
        res.status(200).json({"currentJourney" : newjourney._id,"currentTrip" : newTrip._id,"status" : obj.status,})
    }catch(error){
        res.status(401).json({"message" : error.message})

    }
    
}
export const breakJourney = async (req,res) =>{
    try{
        const obj = req.body;
        const updateStatus = await status.findOneAndUpdate({"userId" : obj.userId},{"status" : obj.status})
        const updateJourney = await journey.findOneAndUpdate({_id : obj.currentJourney},{"status" : obj.status})
        const endTrip = await trip.findOneAndUpdate({_id : obj.currentTrip},{"status" : "INACTIVE","endTime" : new Date(),"end" : obj.end})
       
        res.status(200).json({"message" : "success"})
    }catch(error) {
        res.status(401).json({"message" : error.message})

    }
}


// {"start" : [[]],"status" : 'ACTIVE' , "currentJourney" : "asdas","userId" : "sadasfas"}
export const resumeJourney = async (req,res) =>{
    try{
        const obj = req.body;
        const createTrip = await trip.create({"startTime" : new Date(),route : obj.start,...obj})
        const updateJourney = await journey.findOneAndUpdate({_id : obj.currentJourney},{"status" : obj.status})
        const addTrip = await journey.findOneAndUpdate({_id : obj.currentJourney},{ $push: { trip: [createTrip._id]}})
        const updateStatus = await status.findOneAndUpdate({"userId" : obj.userId},{"status" : obj.status ,"currentTrip" : [createTrip._id]})
        res.status(200).json({"tripId" : createTrip._id})

    }catch(error){
        res.status(401).json({"message" : error.message})
    }
}

export const endJourneys  = async (req,res) =>{
    try{
        const obj = req.body
        
        const updateJourney = await journey.findOneAndUpdate({_id : obj.currentJourney},{"status" : obj.status ,"end" : obj.end , "endTime" : new Date()})
        const updateTrip = await trip.findOneAndUpdate({_id : obj.currentTrip},{"status" : obj.status ,"end" : obj.end , "endTime" : new Date()})
        const updateStatus = await status.findOneAndUpdate({"userId" : obj.userId},{"status" : obj.status})
        res.status(200).json({"message" : "success"})

    }catch(error){
        res.status(401).json({"message" : error.message})
    }
}
