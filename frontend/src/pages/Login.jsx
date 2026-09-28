import { useState } from "react"
import useAuth from "../hooks/useAuth.jsx"
import { useNavigate } from "react-router-dom"


const Login = () => {
    const {loginUser} = useAuth()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e)=>{
        e.preventDefault()
        await loginUser({email,password})
        navigate('/dashboard')
    }
    return (
        <>
            <div className="container vh-100">
                <div className="row h-100 align-items-center">
                    <div className="col-6">
                        <h1>Login</h1>
                    </div>
                    <div className="col-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" value={email} 
                                onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="InputPassword" value={password} 
                                onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div className="text-center">Create an account? <button className="btn btn-link text-decoration-none" onClick={()=>navigate('/register')}>Register</button></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login