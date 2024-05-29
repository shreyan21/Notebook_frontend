import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ViewNotes from './components/viewNotes';
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
function App() {

  const [show, setShow] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null)
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
        

    </>
  );
}

export default App;
