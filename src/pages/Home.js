import { NavLink } from "react-router-dom"
import image from "../assets/Home-image.jpg"
import Header from "../components/Header"
import '../css/Home.css'

export default function Home() {
    
    return(
        <>
        <Header/>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4 font-signika text">
                    <h4 className="text-1">Little act for</h4>
                    <h1 className="text-2">BIG</h1>
                    <h1 className="text-2">CHANGES</h1>
                    <h5 className="text-3">With ECOFriends, we take care the nature for the world</h5>
                    <NavLink to="/fundraising" type="button" className="mt-4 btn btn-happening shadow-lg">What's happening?</NavLink>
                </div>
                <div className="col-md-5 image">
                    <img src={image} alt="Leaf on home" className="image-leaf"/>
                </div>
            </div>
        </div>
        </>
    )
}