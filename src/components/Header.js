import { NavLink, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { signOutUser } from "../auth/authUser";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Logo from "./Logo";
import '../css/Header.css'

export default function Header() {

    const [getUserActive, setUser] = useState(null)             //Get user if any user active
    const [getDisplayName, setDisplayName] = useState("")       //Get user display name from auth state

    const history = useHistory();
    
    /* Auth check if any user active from auth */
    auth.onAuthStateChanged((user) => {
        setUser(user)
        console.log("user", user)
        if (user === null) {
            setDisplayName("Guests")
        } else {
            setDisplayName(user.displayName)
        }
    })

    return (
        <>
        <header className="navbar d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 shadow-sm">
            <header className="ps-2">
                <Logo />
            </header>
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
                            <Dropdown.Item 
                                onClick={() => {
                                    setTimeout(() => {
                                        signOutUser()                                  
                                        history.push('/')
                                    }, 1000);
                                }}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
                }
            </ul>
        </header>
        </>
    )
}