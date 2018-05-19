import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

import { connect } from 'react-redux';

import Comment from './Comment';
import CommentForm from './CommentForm';
import PostCommentSpacer from './PostCommentSpacer';

class PostComments extends Component {

    formatCommentContent = (comment, addSpacer) => {
        let spacer = "";
        if(addSpacer) {
            spacer = <PostCommentSpacer/>;
        }

        if(this.props.commentId && comment.id === this.props.commentId) {
            let postId = this.props.postId;
            return(<div key={comment.id}><CommentForm comment={comment} postId={postId} />{spacer}</div>);
        }
        else {
            return(<div key={comment.id}><Comment comment={comment} />{spacer}</div>);
        }
    }

    render() {
        const comments = this.props.comments;

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
        if(this.props.commentId === 'new') {
            commentForm = <div><CommentForm /><PostCommentSpacer/></div>
        }

        return (
            <Grid fluid={true}>
                { commentForm }
                { commentList }
            </Grid>
        );
    }
}

PostComments.propTypes = {
    comments: PropTypes.array,
    commentId: PropTypes.string,
    postId: PropTypes.string
};

const mapStateToProps = (state) => {
	return({
        comments: state.comments, 
        commentId: state.commentId,
        postId: state.post.id,
	});
}

export default connect(mapStateToProps, { })(PostComments);