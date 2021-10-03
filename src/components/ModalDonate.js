import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "react-loader-spinner";
import useUpdateInfoDonate from "../hooks/useUpdateInfoDonate";
import './ModalDonate.css'
import successAnim from '../assets/success.gif'

export default function ModalDonate(props) {

    /* Move to another page */
    const history = useHistory();
    const goBack = () => {
        history.goBack()
    }

    /* Get props from previous page */
    const ID_POST = props.id_post;
    const Donation_Raised = props.update_donation;
    const getdonationinput = props.getDonationInput

    /* Hooks */
    const [successState, setSuccessState] = useState(false)
    const [displayName, getDisplayName] = useState("")
    const {updateInfoDonate, loadingInfoDonate} = useUpdateInfoDonate();

    /* Update to graphql */
    const updateInfoDonateById = (ID_POST, Donation_Raised) => {
        updateInfoDonate({variables: {
            ID_POST: ID_POST,
            Donation_Raised: Donation_Raised 
        }})
        setSuccessState(true)
        props.onHide()                                              //Hide modal when update successfully
    }

    /* Get active user */
    auth.onAuthStateChanged((user) => {
        getDisplayName(user.displayName)
    })


    return (
        <>
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="border-0"
            >
            <Modal.Header className="border-0">
                <Modal.Title id="contained-modal-title-vcenter" >
                    <h2>Hi, <span className="text-success">{displayName}</span>!</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="border-0">
                <h4>You're going to donate <span className="text-success">Rp {getdonationinput}</span>.</h4>
                <h6> Click Donate to proceed. </h6>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="success" onClick={() => updateInfoDonateById(ID_POST, Donation_Raised)}>Donate</Button>
                <Button variant="dark" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
            {loadingInfoDonate?
                <>
                <Modal show={true} centered contentClassName="modal-content-loading border-0">
                    <Loader className="text-center mx-auto" type="TailSpin" color="#54775E" height={80} width={80}/>
                </Modal>
                </>
                :
                successState && !loadingInfoDonate?
                <>
                {setTimeout(() => {goBack()}, 4000)}
                <Modal
                    show={true}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    contentClassName="border-0"
                    size="sm"
                    >
                    <Modal.Header className="border-0 success-bg">
                        <Modal.Title id="contained-modal-title-vcenter" >
                            <img src={successAnim} width="100%" height="100%" alt="success-animation"/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="border-0 text-center">
                        <h2>Thank you!</h2>
                        <h6>Your contribution <span className="text-success">save our planet!</span></h6>
                    </Modal.Body>
                </Modal>
                </>
                :null
            }
        </>
    )
}