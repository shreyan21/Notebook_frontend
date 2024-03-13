import { useState, useContext } from "react"
import { loggedInContext } from "../context/LoginContext"
import { useNavigate } from "react-router-dom"
const SignIn = () => {

    const [formData, setData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const {token,setToken}=useContext(loggedInContext)
   const navigate=useNavigate()

    const handleChange = (event) => {
        setData({ ...formData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const res = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
               
            let result=await res.json()
             
            if (res.ok) {

                setToken(result.authtoken);
                navigate('/')

            }
                // Handle other status codes
                else if(res.status===401){
                    throw new Error('Invalid credentials')
                }
                else{
                    throw new Error('An error occurred . Please try again later')
                }
            
        } catch (err) {
         
            setError(err.message)


        }
    }


    return (
        <>
            <div className="container mt-5">
                {!token ? (
                    <form onSubmit={handleSubmit} method="post" style={{ maxWidth: '400px', margin: '0 auto' }}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} minLength="6" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                        <div style={{color:"red"} }>{error}</div>
                    </form>) :''}
            </div>
        </>
    )
}
export default SignIn
