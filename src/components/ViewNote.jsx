import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loggedInContext } from "../context/LoginContext.js";
import { notecontext } from "../context/NoteContext.js";
import { filterContext } from "../context/FilteredContext.js";
import { Backdrop, CircularProgress, Tooltip, Hidden, IconButton } from "@mui/material";
import '../ViewNotes.css';
const drawerWidth = 240;

export default function ViewNote(props) {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  const { token } = useContext(loggedInContext);
  const { note, setNote } = useContext(notecontext);
  const { filternote, setFilter } = useContext(filterContext);
  const [backdrop, setBackdrop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const addNote = (event) => {
    event.preventDefault();
    navigate('/addnote');
  };

  const [formData, setFormData] = useState({
    title: '',
    tag: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://notebook-backend-virid.vercel.app/notes/fetchNotes', {
          method: "GET",
          headers: { 'Content-Type': 'Application/json', 'Authorization': `${token}` }
        });
        if (!res.ok) {
          throw new Error('Error fetching filteredData');
        }
        const result = await res.json();

        let existingItem = JSON.parse(localStorage.getItem('notes')) || { notes: [] };
        existingItem.notes = result.notes;
        localStorage.setItem('notes', JSON.stringify(existingItem));
        setNote(result.notes);
        setFilter(result.notes);
        setFetching(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setBackdrop(false);
      }
    }
    fetchData()
  }, [token,setFilter,setNote])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://notebook-backend-virid.vercel.app/notes/deleteNotes/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'Application/json', 'Authorization': `${token}` }
      });

      const updatedNotes = note.filter(noteItem => noteItem._id !== id);
      localStorage.setItem('notes', JSON.stringify({ notes: updatedNotes }));
      setNote(updatedNotes);
      setFilter(updatedNotes);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateItEdit = () => {
    props.setShow(true);
  };



  const handleClear = () => {
    setFormData({ title: '', tag: '' });
    setFilter(note);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = note.filter(note =>
      (formData.title === '' || note.title.toLowerCase().includes(formData.title.toLowerCase())) &&
      (formData.tag === '' || note.tag.toLowerCase().includes(formData.tag.toLowerCase()))
    );
    setFilter(temp);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}  >
      <form onSubmit={handleSubmit} style={{ padding: '16px' }} className="mt-5">
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
        <button type="submit" className="btn btn-primary w-100">Apply</button>
        <button type="button" onClick={handleClear} className="btn btn-secondary w-100 mt-2">Clear</button>
      </form>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Hidden smUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, mt: 8, ml: 0, position: 'fixed' }}
        >
          {/* <MenuIcon /> */}
          <i className="fa-solid fa-filter fa-sm" style={{ color: "#74C0FC" }}></i>
        </IconButton>
      </Hidden>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: 64 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, ml: { sm: `${drawerWidth}px` } }}>
        {fetching ? (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : filternote.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Your notebook is empty. <Link to="/addnote" className="alert-link">Add a note</Link>
          </div>
        ) : (
          <div className="container mt-5">
            <div className="row">
              {filternote.map((val) => (
                val && val._id && (
                  <div key={val._id} className="col-sm-6 col-xs-12 col-lg-4 col-md-4 col-xl-3 mb-3">
                    <div className="card h-100 shadow" style={{ minHeight: "200px", maxHeight: "300px" }}>
                      <div className="card-header border-light">
                        <Link to={`/${val._id}`} onClick={updateItEdit} className="card-link btn btn-sm float-end">
                          <Tooltip title="Edit" followCursor>
                            <i className="fa-solid fa-pen"></i>
                          </Tooltip>
                        </Link>
                        <h5 className="card-title">{val.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{val.tag}</h6>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{val.description}</p>
                      </div>
                      <div className="card-footer border-light bg-white">
                        <Link to='/' onClick={() => { handleDelete(val._id) }} className="card-link btn btn-sm">
                          <Tooltip title='Delete' followCursor>
                            <i className="fa-solid fa-trash"></i>
                          </Tooltip>
                        </Link>
                        <div className="float-end">{new Date(val.date).toDateString()}</div>
                      </div>
                    </div>
                  </div>
                )
              ))}
              <Tooltip title='Add Note' followCursor>
                <Link className="col-sm-6 col-xs-12 col-lg-4 col-xl-3 col-md-4 mb-3 text-decoration-none" onClick={addNote}>
                  <div className="card bg-light shadow h-100" style={{ borderStyle: 'dashed' }}>
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <i className="fa-solid fa-square-plus fa-lg"></i>
                    </div>
                  </div>
                </Link>
              </Tooltip>
            </div>
          </div>
        )}
        {error && <div>{error}</div>}
      </Box>
    </Box>
  );
}
