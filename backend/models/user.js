const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(this.password,salt)

    this.password = hashedPassword
    next()
})
module.exports = mongoose.model('user',userSchema)