import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Image, OverlayTrigger, Glyphicon } from 'react-bootstrap';

import { connect } from 'react-redux';
import { voteOnComment, showCommentForm, deleteComment } from '../actions';

import * as Utils from '../Utils';

class Comment extends Component {

    vote = (postId, commentId, direction) => {
        this.props.voteOnComment(postId, commentId, direction);
    }

    editComment = (commentId) => {
        this.props.showCommentForm(commentId);
    }

    deleteComment = (postId, commentId) => {
        this.props.deleteComment(postId, commentId);
    }
   
    render() {
        const comment = this.props.comment;
        const photoLocation = Utils.getUserPhotoLocation(comment.author);

        return(
            <Row>
                <Col sm={2} className={'post-comment-image'}>
                    <Image src={photoLocation} circle />
                </Col>
                <Col sm={10} className={'post-comment-heading'}>
                    <Row>
                        <Col sm={9}><b>{comment.author}</b> said  on {Utils.formatTimeStamp(comment.timestamp)}:</Col>
                        <Col className="icon-bar" sm={3}>
                            <span className={'badge-icon post-comment-badge-icon'}>{comment.voteScore}</span>

                            <Link to={'#'} onClick={() => this.deleteComment(this.props.postId, comment.id)}>
                                <span className={'delete-icon post-comment-delete-icon-loc'}></span>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>{comment.body}</Col>
                    </Row>
                    <Row>
                        <Col className="icon-bar" sm={12}>
                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Edit Comment')}>
                                <Link to={'#'} onClick={() => this.editComment(comment.id)}>
                                    <span className={'pencil-icon'}></span>
                                </Link>                         
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Up Vote This')}>
                                <Link to={'#'} onClick={() => this.vote(this.props.postId, comment.id, 'up')}>
                                    <Glyphicon className={'icon-bar-item'} glyph="thumbs-up" />
                                </Link>
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Down Vote This')}>
                                <Link to={'#'} onClick={() => this.vote(this.props.postId, comment.id, 'down')}>
                                    <Glyphicon className={'icon-bar-item icon-bar-item-flip'} glyph="thumbs-down" />
                                </Link>
                            </OverlayTrigger>                        
                        </Col>
                    </Row>
                </Col>
            </Row>

        );
    }
}

Comment.propTypes = {
    voteOnComment: PropTypes.func,
    showCommentForm: PropTypes.func,
    deleteComment: PropTypes.func,
    postId: PropTypes.string
};

const mapStateToProps = (state) => {
	return({
        postId: state.post.id
	});
}

export default connect(mapStateToProps, { voteOnComment, showCommentForm, deleteComment })(Comment);