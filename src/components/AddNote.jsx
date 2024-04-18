import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import Modal from 'react-bootstrap/Modal'

const AddNote = (props) => {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  props.setShow(true)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()


    await fetch('https://notebook-backend-app.vercel.app/notes/addNotes', {
      method: 'POST', headers: { 'Content-Type': 'Application/json', 'Authorization': `${JSON.parse(localStorage.getItem('token'))}` }, body: JSON.stringify({ title, description, tag })
    })

    setTitle('');
    setDescription('');
    setTag('');
    navigate('/');
  }
  return (

    <Modal
      show={props.show}
      onHide={() => { props.setShow(false); navigate('/') }}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton className="mb-0">
        <Modal.Title id="example-custom-modal-styling-title" className="ms-auto"  >
          Add Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          {/* <div className="row justify-content-center">
            <div className="col-md-8"> */}
          <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <button type="submit" style={{  height: '40px' }} className="btn btn-sm btn-dark mt-2 w-100">Add Note</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AddNote