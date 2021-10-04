import logo from '../assets/Logo-MiniProject.png';
import { useHistory } from "react-router-dom";


export default function Logo(props){

    /* Move to another page */
    const history = useHistory();
    const goHome = () => {
        history.replace("/")
    }

    return(
        <>
        {props.className === "text-center"? 
            <div className="col-md-11 my-auto text-center">
                <img src={logo} width="200px" className="donate-cursor" onClick={goHome} alt="logo"/>
            </div>
        :
            <div className="col-md-11 my-auto">
                <img src={logo} width="200px" className="donate-cursor" onClick={goHome} alt="logo"/>
            </div>
        }
        </>
        
    )
}