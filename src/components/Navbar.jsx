import { Link, useNavigate } from "react-router-dom";
import { loggedInContext } from "../context/LoginContext.js";
import { useContext } from "react";
function Navbar(props) {

  const navigate = useNavigate()
  const { token, setToken } = useContext(loggedInContext)


  const setSignIn = () => {
    props.setShow(true)
  }
  const setSignUp = () => {
    props.setShow(true)
  }



  const handleClick = (event) => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    navigate('/')
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            NoteBook
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>

          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link class="nav-link active" aria-current="page" to="/"><i className="fa-solid fa-house"></i></Link>

              </li>

            </ul>
            <ul className="navbar-nav d-flex justify-content-start" >
              {!token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active " to='/signin' onClick={setSignIn} aria-current="page" >SignIn</Link>
                  </li>


                  <li className="nav-item">
                    <Link className="nav-link active " aria-current="page" to="/signup" onClick={setSignUp}>SignUp</Link>
                  </li>
                </>
              )
                :
                (<>

                  <li className="nav-item">

                    <Link className="nav-link active user-profile-button" onClick={() => { props.setShow(true) }} to='/userprofile' aria-current="page" ><i class="fa-regular fa-user">

                    </i>
                      <span className="user-profile-text">User Profile</span>

                    </Link>
                  </li>
                  {/* <li>
                   <Link className="nav-link ms-2"><i class="fa-solid fa-moon"></i></Link>

                  </li> */}

                  <li className="nav-item">
                    <Link className="nav-link active " aria-current="page" onClick={handleClick} to='/signin'   >SignOut</Link>
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