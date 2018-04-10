import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Grid, Row, Col, Image, OverlayTrigger, Glyphicon } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import * as Utils from '../Utils';

import * as ReadableApi from '../utils/Api';

class PostContent extends Component {

    state = {
        post: {}
    }

    componentDidMount() {
        const postId = this.props.postId;
        ReadableApi.getPostById(postId).then((post) => {
            this.setState({ post: post });
        });
    }

    render() {

        const post = this.state.post;
        const photoLocation = Utils.getPhotoLocation(post.title, 86);

    //   const postBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

        return (
            <Grid fluid={true}>
            <Row>
                <Col sm={2} ><Image src={photoLocation} /></Col>
                <Col sm={10} className={'post-content-heading'}>
                    <Row>
                        <Col sm={9}>
                            <b>{post.title}</b>
                        </Col>
                        <Col className="icon-bar" sm={3}>
                            <span className={'badge-icon'}>{post.voteScore}</span>

                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Number of Comments')}>
                                <span className={'comments-icon'}>{post.commentCount}</span>
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Delete Post')}>
                                <span className={'delete-icon post-content-delete-icon-loc'}></span>
                            </OverlayTrigger>                          
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>by {post.author} on {Utils.formatTimeStamp(post.timestamp)}</Col>
                    </Row>

                    <Row>
                        <Col>&nbsp;</Col>
                    </Row>

                    <Row>
                        <Col sm={12}>{post.body}</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="icon-bar" sm={12}>
                <OverlayTrigger placement="top" overlay={Utils.tooltip('Edit Posting')}>
                    <span className={'pencil-icon'}></span>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={Utils.tooltip('Add Comment')}>
                    <span className={'comments-icon'}></span>
                </OverlayTrigger>
                
                <OverlayTrigger placement="top" overlay={Utils.tooltip('Up Vote This')}>
                    <Glyphicon className={'icon-bar-item'} glyph="thumbs-up" onClick={Utils.upVote(post.id)} />
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={Utils.tooltip('Down Vote This')}>
                    <Glyphicon className={'icon-bar-item icon-bar-item-flip'} glyph="thumbs-down" onClick={Utils.downVote(post.id)} />
                </OverlayTrigger>
                </Col>
            </Row>
            </Grid>
        );
    }
}

// PostContent.propTypes = {

// };

export default PostContent;