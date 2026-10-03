import { useEffect } from "react"
import { useState } from "react"
import api from "../config/axiosConfig"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

const UserProfile = () => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: ""
  })
  const [error, setError] = useState('')
  const [loading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/users/profile')
        setUser(response.data)
      }
      catch (err) {
        setError(err.response?.data?.message || 'failed to load profile')
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return <Spinner/>
  }

  return (
    <>
      {error && <div>{error}</div>}
      <h1>Hello,{user.firstName + ' ' + user.lastName}</h1>
      <h1>{user.email}</h1>
      <button className="btn" onClick={() => navigate('/dashboard')}>return to dashboard</button>

    </>
  )
}

export default UserProfile