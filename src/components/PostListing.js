import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, Image, OverlayTrigger, Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as Utils from '../Utils';
import * as ReadableApi from '../utils/Api';

class PostListing extends Component {

    state = {
        posts: []
    }
    
    
    componentDidMount() {

     //   console.log(this.props.routProps);

        const category = this.props.routProps.match.params.category;
        if(category) {
            ReadableApi.getPostsByCategory(category).then((posts) => {
                this.setState({ posts: posts });
            });
        }
        else {
            ReadableApi.getAllPosts().then((posts) => {
                this.setState({ posts: posts });
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

    formatPostContent = (post) => {

        const photoLocation = Utils.getPhotoLocation(post.title, 86);

   //     console.log(post);

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

                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Delete Post')}>
                                                <span className={'delete-icon postlisting-delete-icon-loc'}></span>
                                            </OverlayTrigger>                                            
                                        </Col>
                                    </Row>
                                    <Row><Col sm={12}>{this.generateTeaserText(post.body)}</Col></Row>
                                    <Row>
                                        <Col sm={9}>by {post.author} on {Utils.formatTimeStamp(post.timestamp)}</Col>
                                        <Col className="icon-bar" sm={3}>
                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Edit Posting')}>
                                                <span className={'pencil-icon'}></span>
                                            </OverlayTrigger>
                                            
                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Up Vote This')}>
                                                <Button className={'icon-button'} bsStyle="link" onClick={Utils.upVote(post.id)}>
                                                    <Glyphicon className={'icon-bar-item'} glyph="thumbs-up" />
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="top" overlay={Utils.tooltip('Down Vote This')}>
                                                <Glyphicon className={'icon-bar-item icon-bar-item-flip'} glyph="thumbs-down" />
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

    render() {
        const posts = this.state.posts;
   
        let postList = "";

        if(posts.length > 0) {
            postList = this.state.posts.map((post, index, array) => {
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

// PostListing.propTypes = {

// };

export default PostListing;