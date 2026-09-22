import mongoose from "mongoose"

const jobSchema = mongoose.Schema({
    company:{type:String,required:true},
    position:{type:String,required:true},
    status:{
        type:String,
        enum:['Applied','Interviewing','Rejected'],
        default:'Applied'
    },
    dateApplied:{type:Date,default:Date.now}
})

export default mongoose.model('Job',jobSchema)