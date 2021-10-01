import image from '../assets/Login-images.jpg'
import HeaderLogo from '../components/HeaderLogo'
import './Login.css'
import { auth } from '../firebase'
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { signIn, register, signOutUser } from '../auth/authUser';
import Home from './Home';

export default function Login() {
    
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('Guest');
    const [loggedIn, setLoggedIn] = useState(false);
    const [getUser, setUser] = useState(true)

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            console.log("user", user)
            console.log("getUser", getUser)
            if (user) {
                setUser(true)
            } else {
                setUser(false)
            }
          });
    },[])

    if (!getUser) {
        console.log("getUser", !getUser)
    } else {
        console.log("redirect", !getUser);
        history.push(
            {
                pathname: `/`})
    }

    // const signIn = (event) => {
    //     event.preventDefault();
    
    //     auth
    //       .signInWithEmailAndPassword(email, password)
    //       .then((auth) => {
    //         setMessage('You have successfully logged in!');
    //         setLoggedIn(true);
    //         setUsername(auth.user.email);
    //         // console.log(auth.user)
    //         // resetForm();
    //       })
    //       .catch((error) => alert(error.message));
    //   };
    
    //   const register = (event) => {
    //     event.preventDefault();
    //     auth
    //       .createUserWithEmailAndPassword(email, password)
    //       .then((auth) => {
    //         setMessage('Your account has been created successfully!');
    //         setLoggedIn(true);
    //         setUsername(auth.user.email);
    //         // resetForm();
    //       })
    //       .catch((error) => alert(error.message));
    //   };
    
    //   const signOutUser = () => {
    //     auth
    //       .signOut()
    //       .then(() => {
    //         setMessage('Hello there!');
    //         setUsername('Guest');
    //         setLoggedIn(false);
    //       })
    //       .catch((error) => alert(error.message));
    //   };

    return (
        <div className="jumbotron background-image login-page">
            <HeaderLogo/>
            <form className="container col-md-2 col-sm-8 login font-signika mx-auto">
                <h1 className="signin-text">Sign In</h1>
                    <div className="row g-3">
                        <div className="contact-form">
                            <label htmlFor="validationDefault01" className="form-label my-1">Username</label>
                            <input name='username' type="text" className="form-control" id="validationDefault01" value={email}
              onChange={(event) => setEmail(event.target.value)} required/>
                            {/* <span className="error-msg">{err.name}</span><br/> */}
                            {/* <div className="is-invalid">Full name cannot be empty</div> */}
                        </div>
                        <div className="contact-form">
                            <label htmlFor="validationDefault02" className="form-label my-1">Password</label>
                            <input name='password' type="password" className="form-control" id="validationDefault02" value={password}
              onChange={(event) => setPassword(event.target.value)} required/>
                            {/* <span className="error-msg">{err.mail}</span><br/> */}
                            {/* <div className="is-invalid">Email address cannot be empty</div> */}
                        </div>
                        <div className="col-12">
                            {/* <button onClick={() => goReviewMessage()} className="btn btn-contact" type="submit">Submit</button> */}
                            <button className="mt-4 btn signin-btn" type="submit" onClick={signIn}>SIGN IN</button>
                        </div>
                    </div>
            </form>
            <button className="mt-4 btn signin-btn" type="button" onClick={signOutUser}>SIGN OUT</button>
            {console.log("auth", auth.user)}
            
        </div>


    )
}