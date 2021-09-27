import logo from "../assets/logo.png"
import './Header.css'

export default function Header() {
    
    return (
        <>
        {/* <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"> */}
        <header className="navbar fixed-top d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
            {/* <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"> */}
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img className="ms-5 me-2" src={logo} alt="ECOFriends logo" style={{width:"60px", height:"60px"}}/>
                <h1 className="font-signika logo m-0">ECOFriends</h1>
            </a>

            <ul className="nav nav-pills">
            {/* <ul id="items" className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> */}
                {/* <li><a href="/about-us" class="nav-link nav-item link-dark font-roboto">About us</a></li> */}
                <button href="/about-us" className="me-4 about-us font-roboto btn">About us</button>
                <button type="button" className="me-5 font-roboto sign-in btn">Sign In</button>
                {/* <li><a href="/sign-in" class="nav-link nav-item me-5 font-roboto sign-in">Sign In</a></li> */}
            </ul>
        </header>
        </>
    )
}