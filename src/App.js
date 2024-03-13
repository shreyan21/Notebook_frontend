import './App.css';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ViewNotes from './components/viewNotes';
import AddNote from './components/AddNote';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { loggedInContext } from './context/LoginContext';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null)
  return (
    <>
      
      <loggedInContext.Provider value={{ token, setToken }}>
        <Navbar />
        <div className='container mt-2'>
        <Routes>
          <Route exact path='/' element={token?<ViewNotes/>:''}/>
          <Route exact path='/addnote' element={<AddNote/>}/>
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
        </Routes>
        </div>
       
      </loggedInContext.Provider>
    </>
  );
}

export default App;
