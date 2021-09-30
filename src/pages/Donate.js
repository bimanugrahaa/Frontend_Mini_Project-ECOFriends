import { useState } from "react";
import { useHistory } from "react-router-dom";

import HeaderLogo from '../components/HeaderLogo'
import ModalDonate from "../components/ModalDonate";
import './Donate.css'

export default function Donate(props) {
    const history = useHistory();
    const goHome = () => {
        history.goBack()
    }

    

    const ID = props.location.state.ID_POST
    const Donation_Raised = props.location.state.Donation_Raised
    console.log("ID_POST_DONATE", ID)
    console.log("Donation_Raised", Donation_Raised)

    const [updateDonation, setUpdatedDonation] = useState(Donation_Raised)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true)
        const donation = e.target.value
        setUpdatedDonation(Donation_Raised+parseInt(donation))
        console.log("donation", parseInt(donation))
    };
    // var myModal = document.getElementById('exampleModalCenter')
    // var myInput = document.getElementById('myInput')

    // if (myModal) {
    //     myModal.addEventListener('shown.bs.modal', function () {
    //         myInput.focus()
    //         })
    // }
    

    return (
        <div className="jumbotron donate-background ">
            
            <div className="row">
                <div className="col-md-5 my-auto">
                    <p className="donate-quotes font-signika">“No matter how much you donate,
                        it will mean a lot to our environment.”</p>

                </div>
                <div className="col-md-7 mx-0 my-0 card-donate card">
                    <div className="row">
                        <div className="col-md-1 my-auto">
                            <i onClick={goHome} className="fa fa-chevron-left fa-2x back-cursor" aria-hidden="true"></i>
                        </div>
                        <div className="col-md-11 mx-auto">
                            <HeaderLogo/>
                        </div>
                    </div>
                    <p className="nominal-text-first font-signika mx-auto">Choose one below</p>
                    {/* <button value={5000} className="btn btn-nominal mt-2 mx-auto font-signika" data-bs-toggle="modal" data-bs-target="#verticallyCentered">Rp 5000</button> */}
                    <button type="button" value={5000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 5000</button>
                    <button type="button" value={10000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 10000</button>
                    <button type="button" value={20000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 20000</button>
                    <button type="button" value={50000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 50000</button>
                    <button type="button" value={100000} className="btn btn-nominal mt-3 mx-auto font-signika" onClick={handleShow}>Rp 100000</button>
                    <h6 className="font-signika mx-auto my-2">OR</h6>
                    <h5 className="font-signika my-1 mx-auto">Another nominal</h5>
                    <div className="form-nominal form-control mx-auto">
                        <span className="font-signika text-rp">Rp</span>
                        <input name='nominal' type="tel" className="ms-2 input-nominal font-signika" placeholder="0" id="validationDefault02" required/>
                    </div>
                    <button className="btn btn-donate mt-3 mx-auto font-signika">DONATE</button>
                </div>

            </div>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>This is a vertically centered modal.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>

            <ModalDonate id_post={ID} update_donation={updateDonation} show={show} onHide={handleClose}/>
        </div>
    )
}