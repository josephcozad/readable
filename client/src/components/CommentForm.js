import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as UUID from 'uuid';
import { Row, Col, Image, FormControl, FormGroup, HelpBlock, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { showCommentForm, addComment, updateComment } from '../actions';

import * as Utils from '../Utils';

class CommentForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            commentId: null,
            input: {
                author: {value: '', valid: true, message: ''},
                comment: {value: '', valid: true, message: ''},
            }
        }

        this.defaultState = this.state 
    }

    componentWillMount() {    
        this.initState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initState(nextProps);
    }

    initState = (props) => {

        let commentId = null;
        let commentInput = this.defaultState.input;
        if(props.comment) { // editing a comment...
            commentId = props.comment.id;
            commentInput.author.value = props.comment.author;
            commentInput.comment.value = props.comment.body;
        }

        this.setState({
            commentId: commentId,
            input: commentInput,
        });
    }

    createComment = (input) => {
        let comment = {};

        if(! this.state.commentId) {
            comment.id = UUID.v4().replace(/-/g, '').slice(0, 19);
            comment.author = input.author.value;
            comment.body = input.comment.value;

            comment.parentId  = this.props.postId;
            comment.timestamp = Date.now();
        }
        else {
            comment.id = this.props.comment.id;
            comment.author = input.author.value;
            comment.body = input.comment.value;          
        }

        return(comment);
    }

    handleChange = (e) => {
        let newInput = this.state.input;
        newInput[e.target.id].value = e.target.value;
        this.setState({
            input: newInput
        });
    }

    doSubmit = () => {
        if (this.formIsValid(this.state.input)) {
            const comment = this.createComment(this.state.input);
            if(! this.state.commentId) {
                this.props.addComment(this.props.postId, comment);
            }
            else {
                this.props.updateComment(this.props.postId, comment);
            }
        }

        this.props.showCommentForm(); // hides form
    }

    doCancel = () => {
        this.props.showCommentForm(); // hides form
    }

    formIsValid = (input) => {
        let formValid = true;

        const keys = Object.keys(input);
        keys.map((key) => {
            let property = input[key];
            if(property.value === '') {
                property.valid = false;
                property.message = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`;
                formValid = false;
            }
            return(null);
        });

        if(!formValid) {
            this.setState({
                input: input
            });
        }

        return formValid;
    }
    
    render() {
        
        const { author, comment } = this.state.input;

        let photoLocation;
        let authorUIValue;

        if(! this.state.commentId) {
            photoLocation = "https://dummyimage.com/86x86/2a2a91/c0c0c4&text=photo";

            authorUIValue = (
                <FormGroup className={author.valid ? "" : "has-error"}>
                    <FormControl type="text" id="author" value={author.value} placeholder="Enter Your Name" onChange={this.handleChange} />
                    <HelpBlock>{author.message}</HelpBlock>
                </FormGroup> 
            );    
        }
        else {
            photoLocation = Utils.getUserPhotoLocation(this.props.comment.author);
            authorUIValue =  `${this.props.comment.author} said  on ${Utils.formatTimeStamp(this.props.comment.timestamp)}:`;
        }
        
        return (
            <Row>
                <Col sm={2} className={'post-comment-image'}>
                    <Image src={photoLocation} circle />
                </Col>
                <Col sm={10} className={'post-comment-heading'}>
                    <Row>
                        <Col sm={12}>{ authorUIValue }</Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FormGroup className={comment.valid ? "" : "has-error"}>
                                <FormControl componentClass="textarea" rows={7} id="comment" value={comment.value} placeholder="Enter Comment" onChange={this.handleChange} />
                                <HelpBlock>{comment.message}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>&nbsp;</Col>
                        <Col className="icon-bar" sm={4}>
                            <Button onClick={() => this.doCancel()} >Cancel</Button>
                            <Button onClick={() => this.doSubmit()}>Save</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

CommentForm.propTypes = {
    showCommentForm: PropTypes.func,
    addComment: PropTypes.func,
    updateComment: PropTypes.func,
    postId: PropTypes.string, 
    comment: PropTypes.object
};

const mapStateToProps = (state) => {
	return({
        postId: state.post.id
	});
}

export default connect(mapStateToProps, { showCommentForm, addComment, updateComment })(CommentForm);