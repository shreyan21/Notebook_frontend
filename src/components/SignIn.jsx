import { useState, useContext } from "react"
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link } from "react-router-dom"
import { loggedInContext } from "../context/LoginContext.js"
import Spinner from 'react-bootstrap/Spinner'
import { profilecontext } from "../context/ProfileContext.js";
import jwt_decode from "jwt-decode"
const SignIn = (props) => {

    const [formData, setData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [reset, setReset] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { setToken } = useContext(loggedInContext)
    const [loading, setLoading] = useState(false);
    const {setAvatar}=useContext(profilecontext)




    const navigate = useNavigate()


    const emailWritten = async (event) => {
        event.preventDefault()
        if (formData.email === '') {
            setError('Enter email first')
        }
        else if (formData.email !== '') {
            const res = await fetch("https://notebook-backend-virid.vercel.app/auth/checkmail", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: formData.email }) })
            const result = await res.json()
            if (result.exists === false) {
                setError("User with this email does not exist")
            }
            else {
                setReset(false)
                navigate(`/password/${formData.email}`)
            }
        }
    }

    const handleChange = (event) => {
        setData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);



        try {
            const res = await fetch('https://notebook-backend-virid.vercel.app/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });


            let result = await res.json()

            if (res.ok) {

                localStorage.setItem('token', JSON.stringify(result.authtoken))
                setToken(result.authtoken)
                const result=jwt_decode(result.authtoken)
                localStorage.setItem('avatar',JSON.stringify(result.data.user.avatar))
                setAvatar(result.data.user.avatar)
                navigate('/')
                
                props.setOpen(true);


            }
            else {
                setError(result.message)
            }


        } catch (err) {

            setError(err)


        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>



            {loading && (
                <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 2000 }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <Modal
                show={props.show}
                onHide={() => { props.setShow(false); navigate('/') }}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                style={{ zIndex: '1500' }}
            >
                <Modal.Header closeButton className="mb-0"
                >
                    <Modal.Title id="example-custom-modal-styling-title" className="ms-auto"  >
                        SignIn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="container ">
                        <form onSubmit={handleSubmit} method="post" style={{ maxWidth: '400px', margin: '0 auto' }}>

                            <div className="mb-1">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className="form-control" onClick={() => setReset(true)} id="password" name="password" value={formData.password} onChange={handleChange} minLength="8" required={reset ? false : true} />
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                                    </button>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-sm  btn-dark mt-2 w-100" style={{ height: '40px' }} >Sign In</button>

                            <Link to={`/password/${formData.email}`} className=" text-decoration-none " onClick={emailWritten} >Forgot password</Link>
                            <div style={{ color: 'red', textAlign: 'center' }} >{error}</div>
                        </form>
                    </div>
                </Modal.Body>

            </Modal>


        </>
    )
}
export default SignIn
