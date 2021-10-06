import Header from "../components/Header";
import image from '../assets/About-us.jpg'

export default function AboutUs(){

    return(
        <>
        <Header/>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-5 mt-5">
                    <img src={image} alt="Leaf on home" className="rounded-circle image-leaf"/>
                </div>
                
                <div className="col-md-4 mt-5 font-signika text-justify">
                    <h1 className="text-2">ECOFriends</h1>
                    <h5 className="text-3 lh-base ">ECOFriends is non-profit organization that dedicated to save our enviroment. Since 2021, ECOFriends helps many people saves our environment through small act. We believe small act can give a big impact.</h5>
                    <h5 className="text-3">Thankyou #ECOFriends!</h5>
                </div>
            </div>
        </div>
        </>
    )
}