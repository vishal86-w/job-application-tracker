import jwt from 'jsonwebtoken'

const auth = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,'mySecretKey')
        req.userId = decoded.userId
        next()
    }
    catch(error){
        res.status(400).json({message:"Not authorized,token failed"})
    }
    
}

export default auth