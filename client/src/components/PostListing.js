import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, Image, OverlayTrigger, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import ArraySort from 'array-sort';

import * as Utils from '../Utils';
import * as ReadableApi from '../utils/Api';

class PostListing extends Component {

    state = {
        posts: []
    }

    componentWillMount() {
        const category = this.props.routeProps.match.params.category;
        this.loadPosts(category);
    }

    componentWillReceiveProps(nextProps) {
        const category = nextProps.routeProps.match.params.category;
        this.loadPosts(category);
    }

    loadPosts(category) {
        if(category) {
            ReadableApi.getPostsByCategory(category).then((posts) => {
                this.setState({posts: posts});
            });
        }
        else {
            ReadableApi.getAllPosts().then((posts) => {
                this.setState({posts: posts});
            });
        }
    }

    generateTeaserText = (postBody) => {
        let teaser = postBody;
        if(teaser.length > 175) {
            let words = postBody.match(/[a-z]+[$\s+]/gi);
            teaser = words.reduce((newTeaser, currentWord) => {
                if(newTeaser.length + currentWord.length < 175) {
                    return (newTeaser += currentWord);
                }
                else {
                    return (newTeaser);
                }
            }, "");

            teaser += ' ...';
        }
        return(teaser);
    }

    upVote(postId) {
        ReadableApi.upVotePost(postId);
    }

    downVote(postId){
        ReadableApi.downVotePost(postId);
    }

    deletePost(postId){
        ReadableApi.deletePost(postId);
    }

    formatPostContent = (post) => {

        const photoLocation = Utils.getPhotoLocation(post.title, 86);

        return(
            <div key={post.id}>
                <Panel>
                    <Panel.Body>
                        <Grid fluid={true}>
                            <Row>
                                <Col sm={2} className={'postlisting-image'}><Image src={photoLocation} /></Col>
                                <Col sm={10} className={'postlisting-heading'}>
                                    <Row className={''}>
                                        <Col sm={9}>
                                            <Link to={`/${post.category}/${post.id}`}><b>{post.title}</b></Link>
                                        </Col>
                                        <Col className="icon-bar" sm={3}>
                                            <span className={'badge-icon'}>{post.voteScore}</span>

                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Number of Comments')}>
                                                <span className={'comments-icon'}>{post.commentCount}</span>
                                            </OverlayTrigger>

                                            <Link to={'#'} onClick={() => this.deletePost(post.id)}>
                                                <span className={'delete-icon postlisting-delete-icon-loc'}></span>
                                            </Link>                                   
                                        </Col>
                                    </Row>
                                    <Row><Col sm={12}>By {post.author} on {Utils.formatTimeStamp(post.timestamp)}</Col></Row>
                                    <Row><Col sm={12}>{this.generateTeaserText(post.body)}</Col></Row>
                                    <Row>
                                        <Col sm={9}>&nbsp;</Col>
                                        <Col className="icon-bar" sm={3}>
                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Edit Posting')}>
                                                <Link to={`/${post.category}/${post.id}?edit=true`}>
                                                    <span className={'pencil-icon'}></span>
                                                </Link>                                                
                                            </OverlayTrigger>
                                            
                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Up Vote This')}>
                                                <Link to={'#'} onClick={() => this.upVote(post.id)}>
                                                    <Glyphicon className={'icon-bar-item'} glyph="thumbs-up" />
                                                </Link>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Down Vote This')}>
                                                <Link to={'#'} onClick={() => this.downVote(post.id)}>
                                                    <Glyphicon className={'icon-bar-item icon-bar-item-flip'} glyph="thumbs-down" />
                                                </Link>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }

    getSortedPosts = () => {
        const posts = this.state.posts;

        let sortBy = this.props.sortBy;
        if(sortBy) {
            const asc = new RegExp('.asc$', 'i').test(sortBy);
            sortBy = sortBy.substr(0, sortBy.lastIndexOf('.')) || sortBy;

            switch(sortBy) {
                case 'voteSort':
                    return ArraySort(posts, 'voteScore', {reverse: !asc});
                case 'authorSort':
                    return ArraySort(posts, 'author', {reverse: !asc});
                case 'dateSort':
                    return ArraySort(posts, 'timestamp', {reverse: !asc});
                default: // default sort by date from newest to oldest...
                    return ArraySort(posts, 'timestamp', {reverse: true}); 
            }
        }
        else {
            if(posts) {
                return ArraySort(posts, 'timestamp', {reverse: true});
            }
            else {
                return posts;
            }
        }
    }

    render() {
        
        const posts = this.getSortedPosts();

        let postList = "";

        if(posts.length > 0) {
            postList = posts.map((post, index, array) => {
                return (
                    this.formatPostContent(post)
                )
            });
        }

        return (
            <Grid fluid={true}>
                {postList}
            </Grid>
        );
    }
}

PostListing.propTypes = {
    sortBy: PropTypes.string,
};

const mapStateToProps = (state) => {
	return({
        sortBy: state.sortByKey,
	});
}

export default connect(mapStateToProps, { })(PostListing);