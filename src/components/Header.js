import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { signOutUser } from "../auth/authUser";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import logo from "../assets/logo.png"
import './Header.css'

export default function Header() {

    const [getUserActive, setUser] = useState(null)             //Get user if any user active
    const [getDisplayName, setDisplayName] = useState("")       //Get user display name from auth state

    /* Auth check if any user active from auth */
    auth.onAuthStateChanged((user) => {
        setUser(user)
        if (user === null) {
            setDisplayName("Guests")
        } else {
            setDisplayName(user.displayName)
        }
        
        console.log("getUserActive Header", getUserActive)
    })

    return (
        <>
        <header className="navbar fixed-top d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 shadow-sm">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img className="ms-5 me-2" src={logo} alt="ECOFriends logo" style={{width:"60px", height:"60px"}}/>
                <h1 className="font-signika logo m-0">ECOFriends</h1>
            </a>

            <ul className="nav nav-pills">
                <button href="/about-us" className="me-4 about-us font-roboto btn">About us</button>
                {getUserActive === null? 
                <>
                    <NavLink to="/login" type="button" className="me-4 font-roboto sign-in btn">Sign In</NavLink>
                    <NavLink to='/signup' type="button" className="me-5 font-roboto sign-up btn">Sign Up</NavLink>
                </>
                : 
                <>
                    <Dropdown className="d-inline ms-1 me-4 justify-content-center p-auto font-signika">
                        <Dropdown.Toggle id="dropdown-autoclose-true" variant="success" className="sign-out">Hi, {getDisplayName}! </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={signOutUser}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
                }
            </ul>
        </header>
        </>
    )
}