import status from "../model/status.js";

export const createStatus = async (req,res) =>{
    try{
       
        const body = req.body;
        const Createdstatus = await status.create(body);
        res.status(200).json(Createdstatus)
    }catch(error) {
        res.status(401).json({"message" : error.message})

    }

}


export const addJourney = async (req,res) => {
    try{
        const journeyId = req.body.journey;
        const userId = req.body.id;
        const addedJouney = await status.updateOne({"userId" : userId},{$push : {journeys : [journeyId]}})
        res.status(200).json(addedJouney)
    }catch(error){
        res.status(401).json({"message" : error.message})


    }
}
export const updateStatus = async (req,res) =>{
    try{
        const userId = req.body.userId;
        const stat = req.body.status;
     
        const updateStatus = await status.findOneAndUpdate({"userId" : userId},{$set : {"status" : stat}})
        res.status(200).json(updateStatus)
    }
    catch(error){
        res.status(401).json({"message":error.message})
    }
}
export const updateCurrentJourney = async (req,res) =>{
    try{
        const userId = req.body.userId;
        const journey = req.body.currentJourney;
        const updateJourney = await status.findOneAndUpdate({"userId" : userId},{"currentJourney" : journey})
        res.status(200).json(updateJourney)
    }catch(error){
        res.status(401).json({"message" :error.message})

    }
}
export const updateCurrentTrip = async (req,res) =>{
    try{
        const userId = req.body.userId;
        const trip = req.body.currentTrip;
        
        const updateTrip = await status.findOneAndUpdate({"userId" : userId},{"currentTrip" : trip})
        res.status(200).json(updateTrip)

    }catch(error){
        res.status(401).json({"message" : error.message})

    }
}

export const getStatusByuserId = async (req,res) =>{
    try{
        const userId = req.body.userId;
        const statusByUser = await status.findOne({"userId" : userId});
        res.status(200).json(statusByUser)

    }catch(error){
        res.status(401).json({"message" : error.message})

    }
}

export const getAllUserStatus = async (req,res) =>{
    try{
        const allUser = await status.find();
        res.status(200).json(allUser)

    }catch(error){
        res.status(401).json({"message" : error.message})

    }
}