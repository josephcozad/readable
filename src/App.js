import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import CategoryListing from './components/CategoryListing';
import PostLayout from './components/PostLayout';
import PostListing from './components/PostListing';

class App extends Component {

    state = {
        commentFormOpen: false,
        postFormOpen: false,
        post: null,
        comment: null
    }

    componentDidMount() {
        console.log('here we are.... again.');
    }

    render() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col>
                        <Route path="/:category?" render={(routProps) => (
                            <NavBar routProps={routProps} />
                        )} />                          
                    </Col>
                </Row>
                <Row>
                    <Col sm={1}>&nbsp;</Col>
                    <Col sm={8}>
                        <Switch>
                            <Route path="/:category/:postId" render={(routProps) => (
                                <PostLayout routProps={routProps} />
                            )}/>
                            <Route path="/:category?" render={(routProps) => (
                                <PostListing routProps={routProps} />
                            )} />                 
                        </Switch>
                    </Col>
                    <Col sm={2}>
                        <CategoryListing />
                    </Col>
                    <Col sm={1}>&nbsp;</Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
