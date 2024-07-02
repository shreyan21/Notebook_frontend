import { useState, useContext } from "react"
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link } from "react-router-dom"
import { loggedInContext } from "../context/LoginContext.js"
import { jwtDecode } from "jwt-decode";
import { imagecontext } from "../context/ImageContext.js";

const SignIn = (props) => {

    const [formData, setData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [reset, setReset] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { setToken } = useContext(loggedInContext)
    const {setImg}=useContext(imagecontext)


     



    const navigate = useNavigate()


    const emailWritten = (event) => {
        event.preventDefault()
        if (formData.email === '') {
            setError('Enter email first')
        }
        else {
            setReset(false)
            navigate(`/password/${formData.email}`)
        }
    }

    const handleChange = (event) => {
        setData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const res = await fetch('https://notebook-backend-nine.vercel.app/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });


            let result = await res.json()

            if (res.ok) {

                localStorage.setItem('token', JSON.stringify(result.authtoken))
                setToken(result.authtoken)
                const decode=jwtDecode(result.authtoken)
                localStorage.setItem('image',JSON.stringify(decode.user.image))
                setImg(decode.user.image)
                console.log(decode.user.image);
                navigate('/')
                
                  props.setOpen(true);


            }
            else {
                setError(result.message)
            }


        } catch (err) {

            setError(err)


        }
    }

    return (
        <>





            <Modal
                show={props.show}
                onHide={() => { props.setShow(false); navigate('/') }}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title" 
                style={{zIndex:'1500'}}
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
