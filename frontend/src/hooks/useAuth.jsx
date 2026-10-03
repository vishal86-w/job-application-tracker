
import {  useState } from "react"
import api from "../config/axiosConfig"

const useAuth = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState('')

    const loginUser = async (credentials)=>{
        setIsLoading(true)
        setError('')
        try{
            const response = await api.post('/api/users/login',credentials)
        }
        catch(err){
            setError(err.response.data.message)
            throw err
        }
        finally{
            setIsLoading(false)
        } 
    }

    const registerUser= async(credentials)=>{
        setIsLoading(true)
        setError('')
        try{
            await api.post('/api/users/register',credentials)

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

    const logoutUser =()=>{
        try{
            api.post('/api/users/logout')
        }catch(err){
            console.log(err);
            
        }
    }
  return {isLoading,setIsLoading,error,setError,loginUser,registerUser,logoutUser}
}

export default useAuth