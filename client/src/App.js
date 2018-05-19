import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import CategoryListing from './components/CategoryListing';
import PostDetail from './components/PostDetail';
import PostListing from './components/PostListing';

class App extends Component {

    render() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col>
                        <Route path="/:category?" render={(routeProps) => (
                            <NavBar routeProps={routeProps} />
                        )} />                          
                    </Col>
                </Row>
                <Row>
                    <Col sm={1}>&nbsp;</Col>
                    <Col sm={8}>
                        <Switch>
                            <Route path="/:category/:postId" render={(routeProps) => (
                                <PostDetail routeProps={routeProps} />
                            )}/>
                            <Route path="/:category?" render={(routeProps) => (
                                <PostListing routeProps={routeProps} />
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
