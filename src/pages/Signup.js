import image from '../assets/Login-images.jpg'
import HeaderLogo from '../components/HeaderLogo'
import './Login.css'
import { auth } from '../firebase'
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { signIn, register, signOutUser } from '../auth/authUser';
import Home from './Home';
import { Link } from 'react-router-dom';

export default function Signup() {

    const history = useHistory();


    //Validation error
    const baseError = {
        displayname: "",
        email: "",
        confirmpassword: ""
    }

    //Input useState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [getUser, setUser] = useState(true)

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            console.log("user", user)
            console.log("getUser", getUser)
            if (user) {
                setUser(true)
                history.push({
                    pathname: `/`
                })
            } else {
                setUser(false)
            }
          });
    },[])

    //Validation useState
    const [err, setErr] = useState(baseError)
    const regexName = /^[A-Za-z ]*$/;
    const regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let errName =  err.displayname;
        let errMail = err.email;
        let errConfirmPassword = err.confirmpassword

        if (name === "displayname") {
            if(value === "") {
                errName = "Full name cannot be empty!"
            } else if (regexName.test(value)) {
                errName = ""
            } else {
                errName = "Full name only alphabet!"
            }
            console.log(value) 
            setErr({...err, [name]: errName})
            setDisplayName(value)
        }

        if (name === "email"){
            if (value === "") {
                errMail = "Mail cannot be empty!"
            } else if (!(regexMail.test(value))) {
                errMail = "Mail is invalid!"
            } else if (regexMail.test(value)) {
                errMail = ""
            }

            console.log(regexMail.test(value))
            setErr({...err, [name]: errMail})
            setEmail(value)
        }

        if (name === "confirmpassword") {
            if (value !== password ) {
                errConfirmPassword = "Password doesn't match!"
            } else {
                errConfirmPassword = ""
            }

            setConfirmPassword(value)

            setErr({...err, [name]: errConfirmPassword})

        }
    }

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('Guest');
    const [loggedIn, setLoggedIn] = useState(false);
    // const [getUser, setUser] = useState(true)

    const register = (event) => {
        event.preventDefault();
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
            setMessage('Your account has been created successfully!');
            setLoggedIn(true);
            setUsername(auth.user.email);
            auth.user.updateProfile({displayName: displayName})
            // resetForm();
          })
          .catch((error) => {
              alert(error.message)
            //   setErr({...err, ["email"]: error.message})
                console.log(err)});

      };

    return (
        <div className="jumbotron background-image login-page">
            <HeaderLogo/>
            <h1 className="welcome-text signin-text">Welcome to ECOFriends!</h1>
            <form className="container col-md-2 col-sm-8 signup font-signika mx-auto card card-signup border-0 shadow">
                <h1 className="signin-text">Sign Up</h1>
                    <div className="row g-3">

                        {/* Fullname input */}
                        <div className="contact-form">
                            <label htmlFor="validationDefault01" className="form-label my-1">Full Name</label>
                            <input name='displayname' type="text" className="form-control" id="validationDefault01" value={displayName}
                                onChange={handleInput} required/>
                            <span className="error-msg">{err.displayname}</span><br/>

                        </div>

                        {/* Email input */}
                        <div className="contact-form mt-0">
                            <label htmlFor="validationDefault02" className="form-label my-1">Email</label>
                            <input name='email' type="email" className="form-control" id="validationDefault02" value={email}
                                onChange={handleInput} required/>
                            <span className="error-msg">{err.email}</span><br/>
                        </div>

                        {/* Password input */}
                        <div className="contact-form mt-0">
                            <label htmlFor="validationDefault03" className="form-label my-1">Password</label>
                            <input name='password' type="password" className="form-control" id="validationDefault03" value={password}
                                onChange={(event) => setPassword(event.target.value)} required/>
                        </div>

                        {/* Password confirm input */}
                        <div className="contact-form">
                            <label htmlFor="validationDefault04" className="form-label my-1">Confirm Password</label>
                            <input name='confirmpassword' type="password" className="form-control" id="validationDefault04" value={confirmPassword}
                                onChange={handleInput} required/>
                            <span className="error-msg">{err.confirmpassword}</span><br/>
                        </div>

                        <div className="col-12">
                            {/* <button onClick={() => goReviewMessage()} className="btn btn-contact" type="submit">Submit</button> */}
                            <button className="mt-2 btn signin-btn" type="submit" onClick={register}>SIGN UP</button>
                        </div>
                    </div>
            </form>

            <h6 className="mt-4 text-light font-signika">Already have an account? <Link to='/login' className="text-success">Sign in!</Link></h6>
            {/* <button className="mt-4 btn signin-btn" type="button" onClick={signOutUser}>SIGN UP</button>
            {console.log("auth", auth.user)} */}
            
        </div>


    )
}