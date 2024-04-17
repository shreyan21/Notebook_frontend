import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
const EditNote = (props) => {

    let val
    const data = JSON.parse(localStorage.getItem('notes')).notes;
    const { id } = useParams()
    const navigate = useNavigate()
    for (const iterator of data) {
        if (iterator._id === id) {
            val = { id: iterator._id, title: iterator.title, description: iterator.description, tag: iterator.tag }
            break
        }
    }
    const [title, setTitle] = useState(val.title)
    const [tag, setTag] = useState(val.tag)
    const [description, setDescription] = useState(val.description)

    useEffect(() => {  setTitle(val.title); setTag(val.tag); setDescription(val.description) }, [val.id,val.description,val.tag,val.title])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await fetch(`http://localhost:3001/notes/updateNotes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'Application/json', 'Authorization': `${JSON.parse(localStorage.getItem('token'))}` }, body: JSON.stringify({ title, description, tag }) })


        }
        catch (err) {

        }

        navigate('/')


    }



    return (
        <>



            <Modal
                show={props.show}
                onHide={() => { props.setShow(false); }}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton className="mb-0"
                >
                    <Modal.Title id="example-custom-modal-styling-title" className="ms-auto"  >
                        Save
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="container mt-0">

                        <form onSubmit={handleSubmit} >
                            <div className="mb-1">
                                <label htmlFor="name" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="mb-1">
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
                            <div className="mb-2">
                                <label htmlFor="tag">Tag</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tag"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                            </div>
                            <button type="submit" style={{ height:'40px' }} className="btn btn-primary btn-sm w-100 mt-2 ">Update</button>
                        </form>
                    </div>

                </Modal.Body >
            </Modal >

        </>
    );

}

export default EditNote