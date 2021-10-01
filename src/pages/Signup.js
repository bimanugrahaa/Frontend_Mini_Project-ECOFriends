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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('Guest');
    const [loggedIn, setLoggedIn] = useState(false);
    const [getUser, setUser] = useState(true)

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
          .catch((error) => alert(error.message));

      };

    return (
        <div className="jumbotron background-image login-page">
            <HeaderLogo/>
            <h1 className="welcome-text signin-text">Welcome to ECOFriends!</h1>
            <form className="container col-md-2 col-sm-8 login font-signika mx-auto card card-signup border-0 shadow">
                <h1 className="signin-text">Sign Up</h1>
                    <div className="row g-3">

                        {/* Fullname input */}
                        <div className="contact-form">
                            <label htmlFor="validationDefault01" className="form-label my-1">Full Name</label>
                            <input name='displayname' type="text" className="form-control" id="validationDefault01" value={displayName}
                                onChange={(event) => setDisplayName(event.target.value)} required/>
                            {/* <span className="error-msg">{err.name}</span><br/> */}
                            {/* <div className="is-invalid">Full name cannot be empty</div> */}
                        </div>

                        {/* Email input */}
                        <div className="contact-form">
                            <label htmlFor="validationDefault02" className="form-label my-1">Email</label>
                            <input name='email' type="email" className="form-control" id="validationDefault02" value={email}
                                onChange={(event) => setEmail(event.target.value)} required/>
                            {/* <span className="error-msg">{err.name}</span><br/> */}
                            {/* <div className="is-invalid">Full name cannot be empty</div> */}
                        </div>

                        {/* Password input */}
                        <div className="contact-form">
                            <label htmlFor="validationDefault03" className="form-label my-1">Password</label>
                            <input name='password' type="password" className="form-control" id="validationDefault03" value={password}
                                onChange={(event) => setPassword(event.target.value)} required/>
                            {/* <span className="error-msg">{err.mail}</span><br/> */}
                            {/* <div className="is-invalid">Email address cannot be empty</div> */}
                        </div>

                        {/* Password confirm input */}
                        <div className="contact-form">
                            <label htmlFor="validationDefault04" className="form-label my-1">Confirm Password</label>
                            <input name='confirmpassword' type="password" className="form-control" id="validationDefault04" value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)} required/>
                            {/* <span className="error-msg">{err.mail}</span><br/> */}
                            {/* <div className="is-invalid">Email address cannot be empty</div> */}
                        </div>

                        <div className="col-12">
                            {/* <button onClick={() => goReviewMessage()} className="btn btn-contact" type="submit">Submit</button> */}
                            <button className="mt-4 btn signin-btn" type="submit" onClick={register}>SIGN UP</button>
                        </div>
                    </div>
            </form>

            <h6 className="mt-4 text-light font-signika">Already have an account? <Link to='/login' className="text-success">Sign in!</Link></h6>
            {/* <button className="mt-4 btn signin-btn" type="button" onClick={signOutUser}>SIGN UP</button>
            {console.log("auth", auth.user)} */}
            
        </div>


    )
}