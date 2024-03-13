import { useNavigate } from "react-router-dom";
import { loggedInContext } from "../context/LoginContext";
import { useContext, useState } from "react";
const AddNote = () => {


  const { token } = useContext(loggedInContext)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const navigate = useNavigate()
  async function handleSubmit(event) {
    event.preventDefault()

    await fetch('http://localhost:3001/notes/addNotes', {
      method: 'POST', headers: { 'Content-Type': 'Application/json', 'Authorization': `${token}` }, body: JSON.stringify({ title, description, tag })
    })
    setTitle('');
    setDescription('');
    setTag('');
    navigate('/')

  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>Add Note</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Add Note</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default AddNote