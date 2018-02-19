import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ConfirmationModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            confirmationFor: null
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.permissionHandler = this.permissionHandler.bind(this);
    }
    handleClose() {
        this.setState({ show: false, confirmationFor: null });
    }

    handleShow(idFor) {
        this.setState({ show: true, confirmationFor: idFor});
    }
    permissionHandler(){
        this.props.permissionHandler(this.state.confirmationFor);
    }
    render(){
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <br />
                    <h4>{this.props.msg}</h4>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.permissionHandler} bsStyle="danger">Sure</Button>                    
                    <Button onClick={this.handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}  
export default ConfirmationModal;