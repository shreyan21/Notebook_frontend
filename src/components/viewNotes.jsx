
import { loggedInContext } from "../context/LoginContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
const ViewNotes = () => {

    const { token } = useContext(loggedInContext)
    const [data, setData] = useState([])
    const [err, setError] = useState('')

    

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3001/notes/fetchNotes', { method: "GET", headers: { 'Content-Type': 'Application/json', 'Authorization': `${token}` } })
            if (!res.ok) {
                throw new Error('Error fetching data')
            }
            const result = await res.json()
            setData(result.notes)
        }
        catch (err) {
            setError(err)
        }
    }



    useEffect(() => { fetchData() }, [token])
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Tag</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((val) => (
                                        <>
                                            <tr>
                                                <td>{val.title}</td>
                                                <td>{val.description}</td>
                                                <td>{val.tag}</td>
                                                <td>
                                                    <Link to="/" className="btn btn-sm btn-primary"><i className="fas fa-edit"></i></Link>
                                                    <span style={{ marginRight: '6px' }}></span>
                                                    <Link to="/" className="btn btn-sm btn-danger"><i className="fas fa-trash-alt"></i></Link>
                                                </td>
                                            </tr>



                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewNotes