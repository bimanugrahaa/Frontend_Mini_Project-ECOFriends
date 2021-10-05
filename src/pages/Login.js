import './Login.css'
import { auth } from '../firebase'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Loader from 'react-loader-spinner';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function Login() {
    
    const history = useHistory();

    /* useState */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [getToast, setToast] = useState(false);

    /* Get active user */
    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                history.push({
                    pathname: `/`
                })
            }});
        })

    /* signIn using firebase auth */
    const signIn = async(event) => {
        event.preventDefault();
    
        setLoading(true)
        await auth
          .signInWithEmailAndPassword(email, password)
          .then((auth) => {
            setLoading(false)
          })
          .catch((error) => {
                setLoading(false)
                setToast(true)
                setMessage(error.message)
            });
      };

    return (
        <div className="jumbotron background-image login-page">
            <header className="p-2 col-14">
                <Logo />
            </header>
            {loading?
                <Loader type="TailSpin" color="#528A62" height={80} width={80}/>
            :
            <>
            <form className="container col-md-2 col-sm-8 login font-signika mx-auto card card-signup border-0 shadow">
                <h1 className="signin-text">Sign In</h1>
                <div className="row g-3">
                    <div className="contact-form">
                        <label htmlFor="validationDefault01" className="form-label my-1">Email</label>
                        <input name='username' type="text" className="form-control" id="validationDefault01" value={email} onChange={(event) => setEmail(event.target.value)} required/>
                    </div>
                    <div className="contact-form">
                        <label htmlFor="validationDefault02" className="form-label my-1">Password</label>
                        <input name='password' type="password" className="form-control" id="validationDefault02" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                    </div>
                    <div className="col-12">
                        <button className="mt-4 btn signin-btn" type="submit" onClick={signIn}>SIGN IN</button>
                    </div>
                </div>
            </form>
            <h6 className="mt-4 text-light font-signika">Don't have an account? <Link to='/signup' className="text-success">Sign Up!</Link></h6>
            </>
            }
            <ToastContainer position="bottom-center" className="mb-5 border-0">
                <Toast show={getToast} onClose={() => setToast(false)} className="border-0" bg="danger" delay={5000} autohide>
                        <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>            
        </div>
    )
}