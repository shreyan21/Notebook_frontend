import React, { useContext } from 'react';
import { loggedInContext } from '../context/LoginContext';
import { jwtDecode } from 'jwt-decode';
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom';
// import { Avatar } from '@mui/material';
// import { imagecontext } from '../context/ImageContext';

function UserProfile(props) {
    // Fetch user details and handle delete account functionality here
    const { token, setToken } = useContext(loggedInContext)
    const data = jwtDecode(token)
    const navigate = useNavigate()
    // const { img, setImg } = useContext(imagecontext)
    // const fileUploadRef = useRef();

    // const handleImageUpload = (event) => {
    //     event.preventDefault();
    //     fileUploadRef.current.click();
    // };

    // const uploadImage = async (file) => {
    //     const formData = new FormData()
    //     formData.append('image', file)
    //     const response = await fetch('https://notebook-backend-nine.vercel.app/auth/imgupdate', {
    //         method: 'PUT',
    //         headers: {
    //             'Authorization': `${token}`
    //         },
    //         body: formData
    //     });
    //     if (response.ok) {
    //         const result = await response.json();
            
    //         setImg(result.image);
    //         let image = JSON.parse(localStorage.getItem('image'));
    //         if (!image) {
    //           console.error('No image found in local storage');
    //           return;
    //         }
          
    //         // Update the image name
    //         image = result.image;
          
    //         // Save the updated image back to local storage
    //         localStorage.setItem('image', JSON.stringify(image));
    //     } else {
    //         console.error('Failed to upload image');
    //     }
    // }
    const removeuser = async (event) => {
        event.preventDefault()
        await fetch('https://notebook-backend-virid.vercel.app/auth/remove', { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }, body: JSON.stringify({ id: data.user.id }) })
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
