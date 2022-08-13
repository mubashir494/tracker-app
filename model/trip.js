import mongoose from "mongoose";
const tripScheme = mongoose.Schema({
    start:{
        type : [[Number]]
    },
    end :{ 
        type : [[Number]]
    },
    startTime : {
        type : "Date",
        default : new Date()
    },
    endTime :  {
        type : "Date",
    },
    status : {
        type : [String],
        required : true
    },
    route :{
        type : [[Number]]
    }


})
const trip = mongoose.model('trip',tripScheme)
export default trip