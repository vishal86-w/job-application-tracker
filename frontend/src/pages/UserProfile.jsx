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
    return <Spinner />
  }

  return (
    <>
      {error && <div>{error}</div>}
      <div className="container vh-100 ">
        <button className="btn mt-3" onClick={() => navigate('/dashboard')}>return to dashboard</button>
        <div className="row h-50   align-items-center justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow text-center">
              <div className="card-body ">
                <h1>Hello,{user.firstName + ' ' + user.lastName}</h1>
                <h1>{user.email}</h1>

              </div>
            </div>
          </div>


        </div>

      </div>

    </>
  )
}

export default UserProfile