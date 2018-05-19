import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import PostForm from './PostForm';

class AddPostModal extends Component {

    state = {
        show: false,
    }

    componentWillMount() {
        this.props.connect(this.handleShow);
    }

    handleClose = () => {
        this.setState({ show: false });
    }
    
    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        return(
            <Modal dialogClassName="modal-add-post" show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Post</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PostForm cancel={this.handleClose} />
                </Modal.Body>
            </Modal>
        );       
    }

}

AddPostModal.propTypes = {
    connect: PropTypes.func // this is a function that "connects" the modal to the "owner" of the modal.
}

export default AddPostModal;