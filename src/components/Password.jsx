import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
const Password = (props) => {
    const { email } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [confirmPassword, setConfirmpassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const changeit1 = (event) => {
        setPassword(event.target.value)
    }
    const changeit2 = (event) => {
        setConfirmpassword(event.target.value)
    }


    const submitreset = async (event) => {

        event.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match")
        }
        else if (password.length < 8) {
            setError('Password must be at least 6 characters long');
        }
        else if (!/[A-Z]/.test(password)) {
            setError('Password must contain at least one uppercase letter');
        }
        else if (!/[a-z]/.test(password)) {
            setError('Password must contain at least one lowercase letter');
        }
        else if (!/[\d]/.test(password)) {
            setError('Password must contain at least one digit');
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError('Password must contain at least one special character');
        }
        else {
            await fetch('https://notebook-backend-virid.vercel.app/auth/resetPassword', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, email }) })
            navigate('/signin')
        }
    }
    useEffect(() => {
        async function check() {
            const x = await fetch("https://notebook-backend-virid.vercel.app/auth/checkmail", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
             
            const result=await x.json()
            console.log(result);
            if(result.exists===false){
                navigate(-1)

            }

        }
        check()
    }, [email,navigate])
    return (

        <Modal
            show={props.show}
            onHide={() => { props.setShow(false); navigate('/') }}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton className="mb-0"
            >
                <Modal.Title id="example-custom-modal-styling-title" className="ms-auto"  >
                    Reset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="container ">
                    <form onSubmit={submitreset} method="post" style={{ maxWidth: '400px', margin: '0 auto' }}>

                        <div className="mb-1">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="confirmpassword" value={password} onChange={changeit1} minLength="8" required />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                                </button>

                            </div>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="password" name="password" value={confirmPassword} onChange={changeit2} minLength="8" required />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <i className={showConfirmPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                                </button>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-sm  btn-dark mt-2 w-100" style={{ height: '40px' }} >Reset</button>
                        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
                    </form>
                </div>
            </Modal.Body >
        </Modal >
    )
}

export default Password