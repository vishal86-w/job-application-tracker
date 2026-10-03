import { useState } from "react"
import useAuth from "../hooks/useAuth.jsx"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const {registerUser} = useAuth()
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({})
    const [error,setError] = useState('')
    
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const newErrors ={}
        if(firstName===''){
            newErrors.firstName='Please enter your first name.'
        }
        if(lastName===''){
            newErrors.lastName='Please enter your last name.'
        }
        if(firstName===''){
            newErrors.email='Please enter your email.'
        }
        if(firstName===''){
            newErrors.password='Please enter your password.'
        }
        if(Object.keys(newErrors).length>0){
            setFormErrors(newErrors)
            return
        }
        else{
            setFormErrors('')
        }
        try{
            await registerUser({firstName,lastName,email,password})
            navigate('/dashboard')
        }
        catch(err){
            // setError('')
        }
        
    }
    return (
        <>
            <div className="container vh-100">
                <div className="row h-100 align-items-center">
                    <div className="col-6">
                        <h1>Register</h1>
                    </div>
                    <div className="col-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="InputFirstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="InputFirstName" value={firstName}
                                    onChange={(e) =>{
                                        setFirstName(e.target.value)
                                        setFormErrors({...formErrors,firstName:''})
                                    } } />
                                {formErrors.firstName && <span className='text-danger'>{formErrors.firstName}<br /></span>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputLastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="InputLastName" value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                        setFormErrors({...formErrors,lastName:''})
                                    }} />
                             {formErrors.lastName && <span className='text-danger'>{formErrors.lastName}<br /></span>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setFormErrors({...formErrors,email:''})
                                        }} />
                                        {formErrors.email && <span className='text-danger'>{formErrors.email}<br /></span>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="InputPassword" value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setFormErrors({...formErrors,password:''})
                                    }} />
                                    {formErrors.password && <span className='text-danger'>{formErrors.password}<br /></span>}

                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div className="text-center ">
                                Already have an account? <button className="btn btn-link text-decoration-none " onClick={()=>navigate('/login')}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register