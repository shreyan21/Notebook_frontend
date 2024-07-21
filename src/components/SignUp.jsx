import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
const SignUpForm = (props) => {

  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    file: null

  });


  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('')
  const handleChange = (event) => {

    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFileChange = (event) => {
    setData({ ...data, file: event.target.files[0] })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({})
    setMessage('')
    const errors = {};
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(data.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(data.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    }
    if (!/[\d]/.test(data.password)) {
      errors.password = 'Password must contain at least one digit';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      errors.password = 'Password must contain at least one special character';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
     
      // const formdata={'name':data.name,'email':data.email,'password':data.password}
      const formData = new FormData()
      formData.append('image', data.file)
      formData.append('name',data.name)
      formData.append('password',data.password)
      formData.append('email',data.email)
      const response = await fetch('https://notebook-backend-virid.vercel.app/auth/create', {
        method: 'POST',
        // headers:{'Content-Type':'multipart/form-data'},
        
         body:formData})

        

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
      style={{zIndex:'1500'}}
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
            <form onSubmit={handleSubmit} method='POST' style={{ maxWidth: '400px', margin: '0 auto' }} encType='multipart/form-data'>
              <div className="mb-1">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange} required />
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange} required />
              </div>
              <div className="mb-1">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={data.password} onChange={handleChange} minLength="6" required />



                {errors.password && <div className="invalid-feedback">{errors.password}</div>}

              </div>
              <div className="mb-3 ">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>

                <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} minLength="6" required />

                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}

              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Profile Image</label>
                <input type="file" className="form-control"  id="image" name="image" onChange={handleFileChange}  />
              </div>
              <button type="submit" style={{ height: '40px' }} className="btn btn-sm btn-dark mt-2 w-100">Sign Up</button>
              <div style={{ color: "red" }}>{errors.fulfil === '' ?'': errors.fulfil}</div>

            </form>) : message}


        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpForm;
