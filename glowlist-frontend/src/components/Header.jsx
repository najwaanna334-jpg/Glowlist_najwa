import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

// di dalam komponen Header
const navigate = useNavigate

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
}

export default function Header(){
    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link to="/" className="navbar-brand">GlowList</Link>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </nav>
    );
}