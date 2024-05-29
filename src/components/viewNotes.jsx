import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loggedInContext } from "../context/LoginContext.js"
import { notecontext } from "../context/NoteContext.js"
import { filterContext } from "../context/FilteredContext.js"

import '../ViewNotes.css'

const ViewNotes = (props) => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [fetching, setFetching] = useState(true)
    const { token } = useContext(loggedInContext)
    const { note, setNote } = useContext(notecontext)
    const{filternote,setFilter}=useContext(filterContext)

    const addNote = (event) => {
        event.preventDefault()
        // props.setShow(true)
        navigate('/addnote')
    }



    const [formData, setFormData] = useState({
        title: '',
        tag: ''
    });
    async function fetchData() {
        try {
            const res = await fetch('https://notebookbackend-flame.vercel.app/notes/fetchNotes', { method: "GET", headers: { 'Content-Type': 'Application/json', 'Authorization': `${token}` } })
            if (!res.ok) {
                throw new Error('Error fetching filteredData')
            }
            const result = await res.json()
            
            let existingItem = JSON.parse(localStorage.getItem('notes')) || { notes: [] };
            
            // Update existingItem with the fetched notes
            existingItem.notes = result.notes;
            
            // Update localStorage with the updated existingItem
            
            localStorage.setItem('notes', JSON.stringify(existingItem));
            
            setNote(result.notes)
            // Set the filteredData state with the fetched notes
            setFilter(result.notes);
            setFetching(false)
            
        }
        catch (err) {
            setError(err)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://notebookbackend-flame.vercel.app/notes/deleteNotes/${id}`, { method: "DELETE", headers: { 'Content-Type': 'Application/json', 'Authorization': `${token}` } })
            
            for (let i = 0; i < filternote.length; i++) {
                if (note[i]._id === id) {
                    JSON.parse(localStorage.getItem('notes')).notes.splice(i, 1)
                    break
                }
            }
            fetchData()
        }
        catch (err) {
            setError(err)
        }
        
        
        
        
        

    }

    
    const updateItEdit=()=>{
        props.setShow(true);
    }
    
    
    useEffect(fetchData, [token])
    
    const handleClear=()=>{
         setFormData({title:'',tag:''})
         setFilter(note)
    }
    
    const handleSubmit = (e) => {
        // e.preventDefault();
        // Handle form submission logic here
       

            e.preventDefault();
            const temp = note.filter(note =>
                (formData.title === '' || note.title.toLowerCase().includes(formData.title.toLowerCase())) &&
                (formData.tag === '' || note.tag.toLowerCase().includes(formData.tag.toLowerCase()))
            );
            setFilter(temp);
    


    };



    return (



        <>

            {fetching === true ?
                (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

                        <div className="spinner-border text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    filternote.length===0 ? (
                        <div className="alert alert-info text-center" role="alert">
                            Your notebook is empty. <Link to="/addnote" className="alert-link">Add a note</Link>
                        </div>
                    ) :
                        <div>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-3 pt-5  bg-light">
                                        {/* <h2>Filter</h2> */}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="titleInput" className="form-label">Title:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="titleInput"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="Title"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="tagInput" className="form-label">Tag:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="tagInput"
                                                    name="tag"
                                                    value={formData.tag}
                                                    onChange={handleChange}
                                                    placeholder="Tag"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100 ">Apply</button>
                                            <button type="button" onClick={handleClear} className="btn btn-primary w-100 mt-2">Clear</button>

                                        </form>
                                    </div>
                                    <div className="col-lg-9 ">




                                        <div className="container mt-5">
                                            <div className="row">








                                                {filternote.map((val) => (
                                                    val && val._id &&(
                                                    
                                                        <div key={val._id} className=" col-sm-6 col-xs-12 col-lg-4 col-md-4 col-xl-3 mb-3">
                                                            <div className="card h-100 shadow" style={{minHeight:"200px",maxHeight:"300px"}}>
                                                                <div className="card-header border-light">
                                                                    <Link to={`/${val._id}`} onClick={updateItEdit} className="card-link btn btn-sm float-end "  ><i className="fa-solid fa-pen"  ></i></Link>
                                                                    <h5 className="card-title">{val.title}</h5>
                                                                    <h6 className="card-subtitle mb-2 text-body-secondary">{val.tag}</h6>
                                                                </div>
                                                                <div className="card-body" >
                                                                    <p className="card-text">{val.description}</p>
                                                                </div>
                                                                <div className="card-footer border-light bg-white ">

                                                                    <Link to='/' onClick={() =>{ handleDelete(val._id)}} className="card-link btn btn-sm"><i className="fa-solid fa-trash"></i></Link>
                                                                    <div className="float-end ">{new Date(val.date).toDateString()}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )))

                                                }




                                                <Link className=" col-sm-6 col-xs-12 col-lg-4 col-xl-3 col-md-4 mb-3 text-decoration-none " onClick={addNote}  >
                                                    <div className="card bg-light shadow h-100" style={{ borderStyle: 'dashed' }}  >

                                                        <div className="card-body  d-flex justify-content-center  align-items-center">
                                                            {/* <Link className=" text-decoration-none " onClick={addNote} to='/addNote' > */}
                                                            <i className="fa-solid fa-square-plus fa-lg "></i>

                                                            {/* </Link> */}
                                                        </div>

                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                )}
            <div>{error}</div>






        </>

    )
}

export default ViewNotes