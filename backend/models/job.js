const mongoose = require('mongoose')

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

module.exports = mongoose.model('job',jobSchema)