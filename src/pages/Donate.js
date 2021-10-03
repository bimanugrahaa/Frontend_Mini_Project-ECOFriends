import { useState } from "react";
import { useHistory } from "react-router-dom";

import HeaderLogo from '../components/HeaderLogo'
import ModalDonate from "../components/ModalDonate";
import './Donate.css';
import logo from '../assets/Logo-MiniProject.png';
// import logo from "../assets/logo.png"

export default function Donate(props) {
    const history = useHistory();
    const goBack = () => {
        history.goBack()
    }

    const goHome = () => {
        history.replace("/")
    }

    const [getDonationInput, setDonationInput] = useState(0)
    console.log(getDonationInput)

    const ID = props.location.state.ID_POST
    const Donation_Raised = props.location.state.Donation_Raised
    console.log("ID_POST_DONATE", ID)
    console.log("Donation_Raised", Donation_Raised)

    const [updateDonation, setUpdatedDonation] = useState(Donation_Raised)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("getDonationInput", getDonationInput)
        setShow(true)
        // const donation = e.target.value
        setDonationInput(e.target.value)
        setUpdatedDonation(Donation_Raised+parseInt(getDonationInput))
        console.log("updatedDonation", updateDonation)
        console.log("donation", parseInt(getDonationInput))
    };

    const handleShowNominal = (e) => {
        setShow(true)
        // const donation = e.target.value
            // setDonationInput(e.target.value)
        setUpdatedDonation(Donation_Raised+parseInt(getDonationInput))
    }

    return (
        <div className="container-fluid donate-background donate-blur">
            
            <div className="row">
                <div className="col-md-5 my-auto">
                    <p className="donate-quotes font-fira-sans">“No matter how much you donate,
                        it will mean a lot to our environment.”</p>
                </div>
                <div className="col-md-7 mx-0 my-0 card-donate card">
                    <div className="row">
                        <div className="col-md-1 my-auto back-button">
                            <i onClick={goBack} className="fa fa-chevron-left fa-2x donate-cursor" aria-hidden="true"></i>
                        </div>
                        <div className="col-md-11 my-auto text-center">
                            <img src={logo} width="200px" className="donate-cursor" onClick={goHome}/>
                            {/* <HeaderLogo/> */}
                        </div>
                    </div>
                    <p className="nominal-text-first font-signika mx-auto">Choose one below</p>
                    <button type="button" value={5000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 5000</button>
                    <button type="button" value={10000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 10000</button>
                    <button type="button" value={20000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 20000</button>
                    <button type="button" value={50000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 50000</button>
                    <button type="button" value={100000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 100000</button>
                    <h6 className="font-signika mx-auto my-2">OR</h6>
                    <h5 className="font-signika my-1 mx-auto">Another nominal</h5>
                    <div className="form-nominal form-control mx-auto">
                        <span className="font-signika text-rp">Rp</span>
                        <input name='nominal' type="tel" className="ms-2 input-nominal font-signika" placeholder="0" id="validationDefault02" value={getDonationInput} onChange={(e) => setDonationInput(e.target.value)} required/>
                    </div>
                    <button className="btn btn-donate mt-3 mx-auto font-signika" onClick={handleShowNominal}>DONATE</button>
                </div>
            </div>
            <ModalDonate getDonationInput={getDonationInput} id_post={ID} update_donation={updateDonation} show={show} onHide={handleClose}/>
        </div>
    )
}