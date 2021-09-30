import { Modal, Button } from "react-bootstrap";
import HeaderLogo from '../components/HeaderLogo'
import useUpdateInfoDonate from "../hooks/useUpdateInfoDonate";

export default function ModalDonate(props) {

    const {updateInfoDonate, loadingInfoDonate} = useUpdateInfoDonate();
    console.log(props)
    const ID_POST = props.id_post;
    const Donation_Raised = props.update_donation;

    const updateInfoDonateById = (ID_POST, Donation_Raised) => {
        console.log("ID_POST modal", ID_POST)
        updateInfoDonate({variables: {
            ID_POST: ID_POST,
            Donation_Raised: Donation_Raised 
        }})

    }

    return (
        
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
    )
}