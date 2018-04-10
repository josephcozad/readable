import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

import PostComments from './PostComments';
import PostContent from './PostContent';

const PostLayout = (props) => {

    const {category, postId} = props.routProps.match.params;

    return (
        <Grid fluid={true}>
            <Row>
                <Col>
                    <Panel>
                    <Panel.Body>
                        <PostContent category={category} postId={postId} />
                    </Panel.Body>
                    </Panel>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Panel>
                    <Panel.Heading>
                        <Panel.Title><b>Comments</b></Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <PostComments category={category} postId={postId} />
                    </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    );
};

export default PostLayout;