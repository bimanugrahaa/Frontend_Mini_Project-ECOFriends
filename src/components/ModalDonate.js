import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import HeaderLogo from '../components/HeaderLogo'
import useUpdateInfoDonate from "../hooks/useUpdateInfoDonate";
import './ModalDonate.css'

export default function ModalDonate(props) {

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
        {loadingInfoDonate?
            <>
            <Modal show={true} centered contentClassName="modal-content-loading">
                <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
            </Modal>
            </>
            :
            <Modal
            {...props}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <HeaderLogo/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => updateInfoDonateById(ID_POST, Donation_Raised)}>Donate</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        }
        </>
        // <Modal
        //     {...props}
        //     // size="lg"
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        //     >
        //     <Modal.Header closeButton>
        //         <Modal.Title id="contained-modal-title-vcenter">
        //             <HeaderLogo/>
        //         </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <h4>Centered Modal</h4>
        //         <p>
        //         Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        //         dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        //         consectetur ac, vestibulum at eros.
        //         </p>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button onClick={() => updateInfoDonateById(ID_POST, Donation_Raised)}>Donate</Button>
        //         <Button onClick={props.onHide}>Close</Button>
        //     </Modal.Footer>
        //     </Modal>
    )
}