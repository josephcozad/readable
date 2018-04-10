import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Row, Col, Image, Button } from 'react-bootstrap';


class PostCommentForm extends Component {
    render() {
        return (
            <div>
                <Row>
                <Col sm={2} className={'post-comment-image'}><Image src="???" circle /></Col>
                <Col sm={10} className={'post-comment-heading'}>
                    [... NAME INPUT ...] 
                    <br/><br/>
                    [... COMMENT ...]
                </Col>
                </Row>
                <Row><Col><Button>Add Comment</Button></Col></Row>
            </div>
        );
    }
}

// PostCommentForm.propTypes = {

// };

export default PostCommentForm;