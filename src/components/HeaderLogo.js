import logo from "../assets/logo.png"
import './Header.css'

export default function HeaderLogo() {
    
    return(
        <div className="navbar mx-2">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img className="me-2" src={logo} alt="ECOFriends logo" style={{width:"60px", height:"60px"}}/>
                <h1 className="font-signika logo m-0">ECOFriends</h1>
            </a>
        </div>
    )
}