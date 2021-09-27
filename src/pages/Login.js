import image from '../assets/Login-images.jpg'
import HeaderLogo from '../components/HeaderLogo'
import './Login.css'

export default function Login() {
    
    return (
        <div className="jumbotron">
            <HeaderLogo/>
            <form className="container col-md-2 col-sm-8 login font-signika mx-auto">
                <h1 className="signin-text">Sign In</h1>
                    <div className="row g-3">
                        <div className="contact-form">
                            <label htmlFor="validationDefault01" className="form-label my-1">Username</label>
                            <input name='username' type="text" className="form-control" id="validationDefault01" required/>
                            {/* <span className="error-msg">{err.name}</span><br/> */}
                            {/* <div className="is-invalid">Full name cannot be empty</div> */}
                        </div>
                        <div className="contact-form">
                            <label htmlFor="validationDefault02" className="form-label my-1">Password</label>
                            <input name='password' type="password" className="form-control" id="validationDefault02" required/>
                            {/* <span className="error-msg">{err.mail}</span><br/> */}
                            {/* <div className="is-invalid">Email address cannot be empty</div> */}
                        </div>
                        <div className="col-12">
                            {/* <button onClick={() => goReviewMessage()} className="btn btn-contact" type="submit">Submit</button> */}
                            <button className="mt-4 btn signin-btn" type="submit">SIGN IN</button>
                        </div>
                    </div>
            </form>
            
        </div>


    )
}