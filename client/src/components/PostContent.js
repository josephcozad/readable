import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Image, OverlayTrigger, Glyphicon } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { voteOnPost, showCommentForm, deletePost } from '../actions';

import * as Utils from '../Utils';

class PostContent extends Component {

    vote = (postId, direction) => {
        this.props.voteOnPost(postId, direction);
    }

    addComment = () => {
        this.props.showCommentForm('new');
    }

    deletePost = () => {
        const postId = this.props.post.id;
        this.props.deletePost(postId);
        this.props.history.push("/")
    }

    render() {

        const post = this.props.post;

        if(post && post.hasOwnProperty('title')) {
            let photoLocation = Utils.getPhotoLocation(post.title, 86);

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
    
                                    <Link to={'#'} onClick={() => this.deletePost()}>
                                        <span className={'delete-icon post-content-delete-icon-loc'}></span>
                                    </Link>                        
                                </Col>
                            </Row>
    
                            <Row>
                                <Col sm={12}>By {post.author} on {Utils.formatTimeStamp(post.timestamp)}</Col>
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
                            <Link to={`/${post.category}/${post.id}?edit=true`}>
                                <span className={'pencil-icon'}></span>
                            </Link>  
                        </OverlayTrigger>
    
                        <OverlayTrigger placement="top" overlay={Utils.tooltip('Add Comment')}>
                            <Link to={'#'} onClick={() => this.addComment()}>
                                <span className={'comments-icon'}></span>
                            </Link>
                        </OverlayTrigger>
                        
                        <OverlayTrigger placement="top" overlay={Utils.tooltip('Up Vote This')}>
                            <Link to={'#'} refresh="true" onClick={() => this.vote(post.id, 'up')}>
                                <Glyphicon className={'icon-bar-item'} glyph="thumbs-up" />
                            </Link>
                        </OverlayTrigger>
    
                        <OverlayTrigger placement="top" overlay={Utils.tooltip('Down Vote This')}>
                            <Link to={'#'} refresh="true" onClick={() => this.vote(post.id, 'down')}>
                                <Glyphicon className={'icon-bar-item icon-bar-item-flip'} glyph="thumbs-down" />
                            </Link>
                        </OverlayTrigger>
                        </Col>
                    </Row>
                </Grid>
            );        
        }
        else {
            return('');
        }
    }
}

PostContent.propTypes = {
    voteOnPost: PropTypes.func,
    showCommentForm: PropTypes.func,
    deletePost: PropTypes.func,
    post: PropTypes.object
};

const mapStateToProps = (state) => {
	return({
        post: state.post,
	});
}

export default connect(mapStateToProps, { voteOnPost, showCommentForm, deletePost })(withRouter(PostContent));