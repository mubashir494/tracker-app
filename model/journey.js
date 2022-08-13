import mongoose from "mongoose";
const journeyScheme = mongoose.Schema({
    userId : {
        type : "String",
        required : true
    },
    start : {
        type : [[Number]]
    },
    end : { 
        type : [[Number]]
    },
    startTime : {
        type : "Date",
        default : new Date()
    },
    endTime : {
        type : "Date"
    },
    status : {
        type : [String]
    }
    ,
    trip : {
        type : [String]
    }

})
const journey = mongoose.model('journey',journeyScheme)
export default journey;