import { useState } from "react"
import useAuth from "../hooks/useAuth.jsx"
import { useNavigate } from "react-router-dom"


const Login = () => {
    const { loginUser } = useAuth()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({})
    
    
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}
        if (email === '') {
            newErrors.email = 'Please enter the email.'

        }
        if (password === '') {
            newErrors.password = 'Please enter the password.'

        }
        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors)
            return
        } else {
            setFormErrors('')

        }
        try {
            await loginUser({ email, password })
            navigate('/dashboard')
        } catch (err) {
            setError("Login failed,Invalid credentials")
            setTimeout(() => setError(''), 5000)
        }

    }
    return (
        <>
            {error &&
                <div className="toast show position-fixed mt-3 top-0 start-50 translate-middle-x text-bg-danger  border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex ">
                        <div className="toast-body">
                            {error}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>}

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
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setFormErrors({ ...formErrors, email: '' })
                                    }} />
                                {formErrors.email && <span className='text-danger'>{formErrors.email}<br /></span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="InputPassword" value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setFormErrors({ ...formErrors, password: '' })
                                    }} />
                                {formErrors.password && <span className='text-danger'>{formErrors.password}<br /></span>}

                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div className="text-center">Create an account? <button className="btn btn-link text-decoration-none" onClick={() => navigate('/register')}>Register</button></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login