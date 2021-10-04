import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import HeaderLogo from '../components/HeaderLogo'
import useUpdateInfoDonate from "../hooks/useUpdateInfoDonate";
import './ModalDonate.css'

export default function ModalPrivate(props) {

    const history = useHistory();
    const goBack = () => {
        history.replace("/")
    }

    const {updateInfoDonate, loadingInfoDonate} = useUpdateInfoDonate();
    console.log(props)
    const ID_POST = props.id_post;
    const Donation_Raised = props.update_donation;
    const [successState, setSuccessState] = useState(false)

    const updateInfoDonateById = (ID_POST, Donation_Raised) => {
        console.log("ID_POST modal", ID_POST)
        updateInfoDonate({variables: {
            ID_POST: ID_POST,
            Donation_Raised: Donation_Raised 
        }})
        // setSuccessState(true)
        props.onHide()

    }

    // if (loadingInfoDonate) {
    //     setSuccessState(!successState)
    //     console.log("Loader in")
    //     // return(
    //     //     <>
    //     //         <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
    //     //     </>
            
    //     // )
            
    // }


    return (
        <>
            {setTimeout(() => {goBack()}, 2500)}
            <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="border-0"
            >
            <Modal.Header className="border-0">
                <Modal.Title id="contained-modal-title-vcenter" >
                    <h2>Hi, <span className="text-success">Guest!</span>!</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="border-0">
                <h4> Please login to donate! </h4>
                <h6>Thank you for visiting <span className="text-success">ECOFriends!</span>.</h6>
            </Modal.Body>
        </Modal>
        </>
    )
}