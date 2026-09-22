import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
export default mongoose.model('User',userSchema)