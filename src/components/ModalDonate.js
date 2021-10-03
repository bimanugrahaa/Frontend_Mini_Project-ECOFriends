import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import HeaderLogo from '../components/HeaderLogo'
import { auth } from "../firebase";
import useUpdateInfoDonate from "../hooks/useUpdateInfoDonate";
import './ModalDonate.css'

export default function ModalDonate(props) {

    const {updateInfoDonate, loadingInfoDonate} = useUpdateInfoDonate();
    console.log("props", props)
    const ID_POST = props.id_post;
    const Donation_Raised = props.update_donation;
    const getdonationinput = props.getDonationInput
    const [successState, setSuccessState] = useState(false)

    const updateInfoDonateById = (ID_POST, Donation_Raised) => {
        console.log("ID_POST modal", ID_POST)
        updateInfoDonate({variables: {
            ID_POST: ID_POST,
            Donation_Raised: Donation_Raised 
        }})
        setSuccessState(true)
        // setSuccessState(true)
        props.onHide()

    }

    const [displayName, getDisplayName] = useState("")
    auth.onAuthStateChanged((user) => {
        getDisplayName(user.displayName)
      })


    return (
        <>
        {loadingInfoDonate?
            <>
            <Modal show={true} centered contentClassName="modal-content-loading border-0">
                <Loader className="text-center mx-auto" type="TailSpin" color="#54775E" height={80} width={80}/>
            </Modal>
            </>
            :
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
                {/* <h2>Hi, <span className="text-success">{displayName}</span>!</h2> */}
                <h4>
                You're going to donate <span className="text-success">Rp {getdonationinput}</span>.
                </h4>
                <h6> Click Donate to proceed. </h6>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="success" onClick={() => updateInfoDonateById(ID_POST, Donation_Raised)}>Donate</Button>
                <Button variant="dark" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        }
        </>
    )
}