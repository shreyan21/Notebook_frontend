import React, { useContext, useState } from 'react';
import { loggedInContext } from '../context/LoginContext.js';
import {jwtDecode} from 'jwt-decode';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { filterContext } from '../context/FilteredContext.js';
import { notecontext } from '../context/NoteContext.js';
import { profilecontext } from '../context/ProfileContext.js';
import { FaPencilAlt } from 'react-icons/fa';

function UserProfile(props) {
    const { token, setToken } = useContext(loggedInContext);
    const { setFilter } = useContext(filterContext);
    const { setNote } = useContext(notecontext);
    const { avatar, setAvatar } = useContext(profilecontext);
    const data = jwtDecode(token);
    const navigate = useNavigate();
    const [preview, setPreview] = useState(avatar);
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState(data.user.email);
    const [name, setName] = useState(data.user.name);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const saveChanges = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("image", file);
            formData.append("id", data.user.id);
            const res = await fetch('https://notebook-backend-virid.vercel.app/auth/savechanges', {
                method: 'PUT',
                headers: {
                    'Authorization': `${token}`
                },
                body: formData
            });
            const response = await res.json();
            if (response.authtoken) {
                localStorage.setItem('token', JSON.stringify(response.authtoken));
                setToken(response.authtoken);

                if (response.result && response.result.avatar) {
                    localStorage.setItem('avatar', JSON.stringify(response.result.avatar.url));
                    setAvatar(response.result.avatar.url);
                }
            }
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const removeUser = async (event) => {
        event.preventDefault();
        await fetch('https://notebook-backend-virid.vercel.app/auth/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ id: data.user.id })
        });
        localStorage.clear();
        setToken(null);
        setFilter(null);
        setNote(null);
        setAvatar(null);
        navigate('/');
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => { props.setShow(false); navigate('/') }}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                style={{ zIndex: '1500' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title" className="ms-auto">
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={saveChanges} encType='multipart/form-data'>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-3 position-relative">
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                        id="fileInput"
                                    />
                                    <label htmlFor="fileInput" className="position-absolute bottom-0 end-0">
                                        <FaPencilAlt className="btn btn-primary" />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success mt-3">Save Changes</button>
                                <button type="button" className="btn btn-danger mt-3 ms-2 " onClick={removeUser}>Delete Account</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserProfile;
