import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Grid, Row, Col, Image, OverlayTrigger, Glyphicon } from 'react-bootstrap';
import * as Utils from '../Utils';

import * as ReadableApi from '../utils/Api';

import PostCommentForm from './PostCommentForm';
import PostCommentSpacer from './PostCommentSpacer';

class PostComments extends Component {

    state = {
        comments: [],
        showCommentForm: false
    }
    
    componentDidMount() {
        const postId = this.props.postId;

         ReadableApi.getCommentsByPostId(postId).then((comments) => {
             this.setState({ comments: comments });
         });
    }

    formatCommentContent = (comment, addSpacer) => {
        let spacer = "";
        if(addSpacer) {
            spacer = <PostCommentSpacer/>;
        }

        const photoLocation = Utils.getUserPhotoLocation(comment.author);

        return(
            <div key={comment.id}>
                <Row>
                    <Col sm={2} className={'post-comment-image'}>
                        <Image src={photoLocation} circle />
                    </Col>
                    <Col sm={10} className={'post-comment-heading'}>
                        <Row>
                            <Col sm={9}><b>{comment.author}</b> said  on {Utils.formatTimeStamp(comment.timestamp)}:</Col>
                            <Col className="icon-bar" sm={3}>
                                <OverlayTrigger placement="top" overlay={Utils.tooltip('Delete Comment')}>
                                    <span className={'delete-icon post-comment-delete-icon-loc'}></span>
                                </OverlayTrigger> 
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>{comment.body}</Col>
                        </Row>
                        <Row>
                            <Col className="icon-bar" sm={12}>
                                <OverlayTrigger placement="top" overlay={Utils.tooltip('Edit Comment')}>
                                    <span className={'pencil-icon'}></span>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={Utils.tooltip('Up Vote This')}>
                                    <Glyphicon className={'icon-bar-item'} glyph="thumbs-up" onClick={Utils.upVote(comment.id)} />
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={Utils.tooltip('Down Vote This')}>
                                    <Glyphicon className={'icon-bar-item icon-bar-item-flip'} glyph="thumbs-down" onClick={Utils.downVote(comment.id)} />
                                </OverlayTrigger>

                                <span className={'badge-icon post-comment-badge-icon'}>{comment.voteScore}</span>                        
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {spacer}
            </div>
        );
    }

    render() {
        const comments = this.state.comments;

        let commentList = "";

        if(comments.length > 0) {
            commentList = comments.map((comment, index, array) => {
                const addSpacer = index+1 < array.length ? true : false;
                return (
                    this.formatCommentContent(comment, addSpacer)
                )
            });
        }

        let commentForm = "";
        if(this.state.showCommentForm) {
            commentForm = <div><PostCommentForm /><PostCommentSpacer/></div>
        }

        return (
            <Grid fluid={true}>
                {commentForm}
            
                {commentList}
            </Grid>
        );
    }
}

// PostComments.propTypes = {

// };

export default PostComments;