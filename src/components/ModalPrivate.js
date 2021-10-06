import { Modal } from "react-bootstrap";
import { useHistory } from "react-router";

export default function ModalPrivate(props) {

    const history = useHistory();

    return (
        <>
        {props.show? 
            <>
                {setTimeout(() => {
                    history.replace("/login")
                }, 2500)}
                <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter" centered contentClassName="border-0">
                    <Modal.Header className="border-0">
                        <Modal.Title id="contained-modal-title-vcenter" >
                            <h2>Hi, <span className="text-success">Guest</span>!</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="border-0">
                        <h4> Please login to donate! </h4>
                        <h6>Thank you for visiting <span className="text-success">ECOFriends!</span></h6>
                    </Modal.Body>
                </Modal>
            </>
        : "" }
        </>
    )
}