import { useEffect } from 'react'
import { useState } from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import api from '../config/axiosConfig'
const ProtectedRoute = () => {
    
  const [isAuthorised,setIsAuthorised] = useState(false)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    const verifyUser = async ()=>{
      try{
        await api.get('/api/users/profile')
        setIsAuthorised(true)
      }catch(err){
        setIsAuthorised(false)
      }finally{
        setIsLoading(false)
      }
    }
    verifyUser()
  },[])

  if(isLoading){
    return <div>Loading</div>
  }

  return isAuthorised ? <Outlet/> : <Navigate to={'/login'} replace/>
}

export default ProtectedRoute