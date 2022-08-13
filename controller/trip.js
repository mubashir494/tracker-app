import trip from "../model/trip.js";
export const createTrip = async (req,res) =>{
    try{
        const tripDetail = req.body;
    
        const createdTrip = await trip.create(tripDetail)
        res.status(200).json(createdTrip)
    }catch(error){
        res.status(401).json({"message" : error.message})
        
    }

}
export const addRoute = async (coordinates,tripId) =>{
    try{

        let addRoute = await trip.findOneAndUpdate({"_id" : tripId},{ $push: { route: {$each : coordinates} }})
      
    }catch(error){
       
    }

}
export const changestatus = async (req,res) => {
    try{
        const userId = req.body.tripId;
        const status = req.body.status;
        const update = await trip.findByIdAndUpdate(userId,{"status" : status})
        res.status(200).json(update)
    }
    catch(error){
        res.status(401).json({"message" : error.message})
    }

}

export const endTrip = async (req,res) =>{
    try{
        const id = req.body.tripId;
        const endCoord = req.body.endCoord
        const date = new Date();
        const update  = await trip.findOneAndUpdate({"_id" : id},{"endTime" : date,"end" : endCoord})
        res.status(200).json({update})
    }catch(error){
        res.status(401).json({"message" : error.message})
    }
}

export const getTripById = async (req,res) =>{
    try{
        const id = req.body.tripId;
        const trips = await trip.findById(id) ;
        res.status(200).json(trips)

    }catch(error) {
        res.status(401).json({"message" : error.message})

    }
}