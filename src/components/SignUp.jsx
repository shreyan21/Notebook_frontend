import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
const SignUpForm = (props) => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('')
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({})
    setMessage('')
    const errors = {};
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    }
    if (!/[\d]/.test(formData.password)) {
      errors.password = 'Password must contain at least one digit';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await fetch('https://notebookbackend.netlify.app/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const res = await response.json()
      if (response.ok) {
        navigate('/')



      } else if (response.status === 409) {

        setErrors({ fulfil: res.message })
      }
    } catch (error) {
      setErrors({ fulfil: 'Server error' })
    }
  };

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
          SignUp
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >

        <div className="container mt-1">
          {message === '' ? (
            <form onSubmit={handleSubmit} method='POST' style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div className="mb-1">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-1">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={formData.password} onChange={handleChange} minLength="6" required />



                {errors.password && <div className="invalid-feedback">{errors.password}</div>}

              </div>
              <div className="mb-3 ">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>

                <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} minLength="6" required />

                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}

              </div>
              <button type="submit" style={{ height: '40px' }} className="btn btn-sm btn-dark mt-2 w-100">Sign Up</button>
              <div style={{ color: "red" }}>{errors.fulfil === '' ? errors.fulfil : ''}</div>

            </form>) : message}


        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpForm;
