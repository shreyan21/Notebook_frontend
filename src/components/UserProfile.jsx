import React, { useContext } from 'react';
import { loggedInContext } from '../context/LoginContext';
import { jwtDecode } from 'jwt-decode';
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom';

function UserProfile(props) {
    // Fetch user details and handle delete account functionality here
    const { token ,setToken} = useContext(loggedInContext)
    const data = jwtDecode(token)
    const navigate=useNavigate()

    const removeuser=async(event)=>{
        event.preventDefault()
        await fetch('http://localhost:3001/auth/remove',{method:'DELETE',headers:{'Content-Type':'application/json','Authorization':`${token}`},body:JSON.stringify({id:data.user.id})})
        localStorage.clear()
        setToken(null)
     navigate('/')
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={() => { props.setShow(false); navigate('/') }}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton className="mb-0"
                >
                    <Modal.Title id="example-custom-modal-styling-title" className="ms-auto"  >
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">User Profile</h5>
                                        <ul>
                                            <li className="list-group-item">{data.user.email}</li>
                                            <li className="list-group-item">{data.user.name}</li>

                                        </ul>
                                        <button className="btn btn-danger mt-3" onClick={removeuser}>Delete Account</button>
                                    </div>
                                </div>
                           
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserProfile;
