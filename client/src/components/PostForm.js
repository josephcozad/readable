import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import * as UUID from 'uuid';
import { Grid, Row, Col, Image, FormControl, FormGroup, HelpBlock, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { addPost, updatePost } from '../actions';

import * as Utils from '../Utils';

class PostForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            postId: null,
            cancel: null,
            input: {
                title: {value: '', valid: true, message: ''},
                author: {value: '', valid: true, message: ''},
                body: {value: '', valid: true, message: ''},
                category: {value: '', valid: true, message: ''}
            },
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
        
        let postId = null;
        let postInput = this.defaultState.input;

        const post = props.post;
        if(post && post.hasOwnProperty('title')) { // edit post...
            postId = props.post.id;
            postInput.title.value = props.post.title;
            postInput.body.value = props.post.body;

            postInput.author.value = props.post.author;
            postInput.category.value = props.post.category;
        }

        this.setState({
            postId: postId,
            cancel: props.cancel,
            input: postInput,
        });
    }

    createPost = (input) => {
        let post = {};

        if(! this.state.postId) {
            post.title = input.title.value;
            post.author = input.author.value;
            post.body = input.body.value;
            post.category = input.category.value;
            post.id = UUID.v4().replace(/-/g, '').slice(0, 19);
            post.timestamp = Date.now();
        }
        else {
            post.id = this.state.postId;
            post.title = input.title.value;
            post.body = input.body.value;          
        }

        return(post);
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
            const post = this.createPost(this.state.input);
            if(! this.state.postId) {
                this.props.addPost(post);
            }
            else {
                this.props.updatePost(post);
            }
        }

        if(this.state.cancel) {
            this.state.cancel();
        }

        this.props.history.push(this.props.location.pathname);
    }

    doCancel = () => {
        if(this.state.cancel) {
            this.state.cancel();
        }
        else {
            this.props.history.goBack();
        }
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

        const post = this.props.post;
        if(!post) {
            return '';
        }

        const {title, author, body, category} = this.state.input;
        const origTitle = post.title;

        let photoLocation = "https://dummyimage.com/86x86/2a2a91/c0c0c4&text=photo";
        if(origTitle) {
            photoLocation = Utils.getPhotoLocation(origTitle, 86);
        }

        let authorUIValue = `By ${post.author} on ${Utils.formatTimeStamp(post.timestamp)}`;
        let categoryUIValue = '';

        if(! this.state.postId) {
            authorUIValue = (
                <FormGroup className={author.valid ? "" : "has-error"}>
                    <FormControl type="text" id="author" value={author.value} placeholder="Enter Your Name" onChange={this.handleChange} />
                    <HelpBlock>{author.message}</HelpBlock>
                </FormGroup>
            );

            categoryUIValue = (
                <FormGroup className={category.valid ? "" : "has-error"}>
                    <FormControl componentClass="select" id="category" value={category.value} onChange={this.handleChange}>
                        <option>Select A Category</option>
                        <option value="react">react</option>
                        <option value="redux">redux</option>
                        <option value="udacity">udacity</option>
                    </FormControl>
                    <HelpBlock>{category.message}</HelpBlock>
                </FormGroup>
            );
        }

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={2} ><Image src={photoLocation} /></Col>
                    <Col sm={10} className={'post-content-heading'}>
                        <Row>
                            <Col sm={12}>
                                <FormGroup className={title.valid ? "" : "has-error"}>
                                    <FormControl type="text" id="title" value={title.value} placeholder="Enter Post Title" onChange={this.handleChange} />
                                    <HelpBlock>{title.message}</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12}>
                                { authorUIValue }
                            </Col>
                        </Row>

                        <Row>
                            <Col>&nbsp;</Col>
                        </Row>

                        <Row>
                            <Col sm={12}>
                                <FormGroup className={body.valid ? "" : "has-error"}>
                                    <FormControl componentClass="textarea" rows={7} id="body" value={body.value} placeholder="Enter Post Content" onChange={this.handleChange} />
                                    <HelpBlock>{body.message}</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>&nbsp;</Col>
                        </Row> 

                        <Row>
                            <Col sm={8}>
                                { categoryUIValue }
                            </Col>
                            <Col className="icon-bar" sm={4}>
                                <Button onClick={() => this.doCancel()} >Cancel</Button>
                                <Button onClick={() => this.doSubmit()}>Save</Button>
                            </Col>
                        </Row>                        
                    </Col>
                </Row>
            </Grid>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func,
    updatePost: PropTypes.func,
    post: PropTypes.object
};

const mapStateToProps = (state) => {
	return({
		post: state.post
	});
}

export default connect(mapStateToProps, { addPost, updatePost })(withRouter(PostForm));