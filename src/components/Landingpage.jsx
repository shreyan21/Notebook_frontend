import { Link } from 'react-router-dom';

function LandingPage(props) {
    const setSignUp = () => {
        props.setShow(true)
    }
    const setSignIn = () => {
        props.setShow(true)
    }
    return (
        <div className="container-fluid text-center py-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mb-4">Welcome to My Notebook</h1>
                    <p className="lead">Your personal space for organizing notes</p>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-4">
                    <i className='fa-solid fa-book-open fa-2xl text-primary'></i>
                    <h2>Organize Your Thoughts</h2>
                    <p>Keep your ideas, tasks, and inspirations organized in one place. Create multiple notebooks and categorize your notes with tags.</p>
                </div>
                <div className="col-md-4 mt-1 ">
                    <i className='fa-solid fa-handshake fa-2xl  text-primary'></i>
                    <h2>Collaborate with Others</h2>
                    <p>Share your notes with friends, family, or colleagues. Collaborate in real-time and work together on projects or plans.</p>
                </div>
                <div className="col-md-4 mt-1">
                    <i className='fa-solid fa-universal-access fa-2xl text-primary'></i>
                    <h2>Access Anywhere, Anytime</h2>
                    <p>Access your notes from any device - desktop, tablet, or mobile. Your data is securely stored in the cloud, so you can pick up right where you left off.</p>
                </div>
            </div>

            {/* <div className="row mt-5">
                <div className="col-md-6 offset-md-3">
                    <Link to="/signin" onClick={setSignIn} className="btn btn-sm btn-dark  me-3">Sign In</Link>
                    <Link to="/signup" onClick={setSignUp} className="btn btn-sm btn-outline-dark">Sign Up</Link>
                </div>
            </div> */}
              
            <div className="row mt-3">
                <div className="col-md-6 offset-md-3">
                    <p className="text-muted mt-5">Don't have an account? <br /><Link to="/signup" className=' text-decoration-none' onClick={setSignUp}>Sign up here</Link>.</p>
                </div>
            </div>
            
        </div>
    );
}

export default LandingPage;
