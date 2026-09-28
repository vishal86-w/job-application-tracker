import axios from "axios"
import {  useState } from "react"

const useAuth = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState('')

    const loginUser = async (credentials)=>{
        setIsLoading(true)
        setError('')
        try{
            const response = await axios.post('/api/users/login',credentials)
            localStorage.setItem('jwttoken',response.data.token)     
        }
        catch(err){
            setError(err.response.data.message)
        }
        finally{
            setIsLoading(false)
        } 
    }

    const registerUser= async(credentials)=>{
        setIsLoading(true)
        setError('')
        try{
            await axios.post('/api/users/register',credentials)

            //auto login
            await loginUser(credentials)
        }
        catch(err){
            setError(err.response.data.message)
        }
        finally{
            setIsLoading(false)
        }
    }
  return {isLoading,setIsLoading,error,setError,loginUser,registerUser}
}

export default useAuth