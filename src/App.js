import './App.css';
<<<<<<< HEAD

import Navbar from './components/Navbar';
=======
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> 11e5fa5 (Imroved UI)
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddNote from './components/AddNote';
import { Routes, Route } from 'react-router-dom';
import { loggedInContext } from './context/LoginContext.js';
import { notecontext } from './context/NoteContext.js';
import EditNote from './components/EditNote';
import { useState } from 'react';
import Password from './components/Password.jsx';
import LandingPage from './components/Landingpage.jsx';
import UserProfile from './components/UserProfile.jsx';
import { filterContext } from './context/FilteredContext.js';
<<<<<<< HEAD
=======
import ResponsiveAppBar from './components/ResponsiveAppBar.jsx';
import { imagecontext } from './context/ImageContext.js'
// import ViewNotes from './components/viewNotes.jsx';
import ViewNote from './components/ViewNote.jsx';
import { Grow, Snackbar } from '@mui/material';
import Footer from './components/Footer.jsx';

>>>>>>> 11e5fa5 (Imroved UI)
function App() {

  const [show, setShow] = useState(false)
  const [open,setOpen]=useState(false)
  const handleClose=()=>{
    setOpen(false)
  }
  const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null)
<<<<<<< HEAD
  const [note,setNote]=useState([])
  const[filternote,setFilter]=useState([])

  return (
    <> 
        <loggedInContext.Provider value={{ token, setToken }} >
          <notecontext.Provider value={{note,setNote}}>
            <filterContext.Provider value={{filternote,setFilter}}>
          <Navbar setShow={setShow}  />

          {!token && <LandingPage setShow={setShow} />}
          {token && <ViewNotes show={show} setShow={setShow}  />}
          <div className='container mt-2'>
            <Routes>
              <Route exact path='/:id' element={<EditNote show={show} setShow={setShow} />} />
              <Route exact path='/password/:email' element={<Password show={show} setShow={setShow} />} />
              <Route exact path='/userprofile' element={<UserProfile show={show} setShow={setShow} />} />
              <Route exact path='/addnote' element={<AddNote show={show} setShow={setShow} />} />
              <Route exact path='/signin' element={<SignIn show={show} setShow={setShow} />} />
              <Route exact path='/signup' element={<SignUp show={show} setShow={setShow} />} />
            </Routes>
          </div>
          </filterContext.Provider>
          </notecontext.Provider>
        </loggedInContext.Provider>
        
=======
  const [note, setNote] = useState([])
  const [filternote, setFilter] = useState([])
  const [img, setImg] = useState(localStorage.getItem('image')?JSON.parse(localStorage.getItem('image')):null)
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000}  onClose={handleClose} message="Successfully logged In" TransitionComponent={Grow} />

      <loggedInContext.Provider value={{ token, setToken }} >
        <notecontext.Provider value={{ note, setNote }}>
          <filterContext.Provider value={{ filternote, setFilter }}>
            <imagecontext.Provider value={{ img, setImg }}>
              <ResponsiveAppBar setShow={setShow} />
              <div className='container mt-2'>
                {!token && <LandingPage setShow={setShow} />}
                {token && <ViewNote  show={show} setShow={setShow} />}
                <Routes>
                  <Route exact path='/:id' element={<EditNote show={show} setShow={setShow} />} />
                  <Route exact path='/password/:email' element={<Password show={show} setShow={setShow} />} />
                  <Route exact path='/userprofile' element={<UserProfile show={show} setShow={setShow} />} />
                  <Route exact path='/addnote' element={<AddNote show={show} setShow={setShow} />} />
                  <Route exact path='/signin' element={<SignIn show={show} setShow={setShow} setOpen={setOpen} />} />
                  <Route exact path='/signup' element={<SignUp show={show} setShow={setShow} />} />
                </Routes>
              </div>
              {/* {token && < Options/>} */}
              <Footer />

            </imagecontext.Provider>
          </filterContext.Provider>
        </notecontext.Provider>
      </loggedInContext.Provider >
>>>>>>> 11e5fa5 (Imroved UI)

    </>
  );
}

export default App;
