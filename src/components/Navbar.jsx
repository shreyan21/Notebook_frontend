import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { loggedInContext } from "../context/LoginContext";
import ViewNotes from "./viewNotes";
function Navbar() {

  const { token, setToken } = useContext(loggedInContext)


  const handleClick = () => {

    setToken(null)

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">NoteBook</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>

          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">Home</Link>

              </li>


            </ul>
            <ul className="navbar-nav d-flex justify-content-start" >
              {!token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active " aria-current="page" to="/signin">SignIn</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active " aria-current="page" to="/signup">SignUp</Link>
                  </li>
                </>
              )
                :
                ( <>
                  <li className="nav-item">
                    <Link className="nav-link active " aria-current="page" to='/addnote'>Add Note</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link active " aria-current="page" onClick={handleClick} to='/'  >SignOut</Link>
                </li>
                </>)}



            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar