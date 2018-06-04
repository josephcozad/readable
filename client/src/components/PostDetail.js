import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

import { connect } from 'react-redux';
import { getPostDetail } from '../actions';

import PostComments from './PostComments';
import PostContent from './PostContent';
import PostForm from './PostForm';

class PostDetail extends Component {

    componentDidMount() {    
        const {postId} = this.props.routeProps.match.params
        this.props.getPostDetail(postId);
    }

    render() {

        const params = new URLSearchParams(this.props.routeProps.location.search);
        const postFormVisible = params.get('edit') == null ? false : true;

        const postContent = postFormVisible ? <PostForm /> : <PostContent />;

        return(
            <Grid fluid={true}>
                <Row>
                    <Col>
                        <Panel>
                            <Panel.Body>
                                { postContent }
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
                                <PostComments />
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
};

PostContent.propTypes = {
    getPostDetail: PropTypes.func,
};

export default connect(null, { getPostDetail })(PostDetail);