import mongoose from "mongoose";
const statusScheme = mongoose.Schema({
    userId : {type : String},
    status : {type : [String]},
    journeys : {type : [String]},
    currentJourney : {type : [String]},
    currentTrip : {type : [String]}
})
const status = mongoose.model('status',statusScheme);
export default status
