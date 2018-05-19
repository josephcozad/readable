import React from 'react';
import { Row, Col } from 'react-bootstrap';

const PostCommentSpacer = () => {
    return (
        <Row>
            <Col>
                <hr className={'post-comment-separator'} />
            </Col>
        </Row>
    );
};

export default PostCommentSpacer;