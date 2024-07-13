
const Footer = () => {
    return (
        <footer className="text-center bg-body-tertiary fixed-bottom"  >
            <div className="container  pt-3">
                <section className="mb-3">
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.linkedin.com/in/utkarsh-singh-rajawat-b784b21aa/"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-linkedin"></i
                    ></a>

                  
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-google"></i
                    ></a>

                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-instagram"></i
                    ></a>

                  
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-github"></i
                    ></a>
                </section>
            </div>

            {/* <div className="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.05)"}}>
                © 2020 Copyright:
                <a className="text-body text-decoration-none" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div> */}
        </footer>
    )
}

export default Footer