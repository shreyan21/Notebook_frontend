import React, { useContext } from 'react';
import { loggedInContext } from '../context/LoginContext.js';
import { jwtDecode } from 'jwt-decode';
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom';
import { filterContext } from '../context/FilteredContext.js';
import { notecontext } from '../context/NoteContext.js';
import { profilecontext } from '../context/ProfileContext.js';


function UserProfile(props) {
    const { token, setToken } = useContext(loggedInContext)
    const{setFilter}=useContext(filterContext)
    const {setNote}=useContext(notecontext)
    const{setAvatar}=useContext(profilecontext)
    const data = jwtDecode(token)
    const navigate = useNavigate()
   
    // }
    const removeuser = async (event) => {
        event.preventDefault()
        await fetch('https://notebook-backend-virid.vercel.app/auth/remove', { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }, body: JSON.stringify({ id: data.user.id }) })
        localStorage.clear()
        setToken(null)
        setFilter(null)
        setNote(null)
        setAvatar(null)

        
        navigate('/')
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
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <button
                        type='button'
                        onClick={handleImageUpload}
                        className='flex-center absolute bottom-12 right-14 h-9 w-9 rounded-full'>
                        <Avatar src={`https://notebook-backend-nine.vercel.app/images/${img}`} />
                    </button>
                    <input
                        type="file"
                        ref={fileUploadRef}
                        style={{ display: 'none' }}
                        onChange={(event) => {
                            const file = event.target.files[0];
                            // Handle file upload here
                            if (file) {
                                uploadImage(file)
                            }
                        }}
                    /> */}
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
