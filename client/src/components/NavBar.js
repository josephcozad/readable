import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

import { connect } from 'react-redux';
import { clearPostDetail, sortBy } from '../actions';

import AddPostModal from './AddPostModal';

class NavBar extends Component {

    state = {
        category: null,   // current category if any selected
        showModal: null,  // call back on modal comp to open modal
        showAddPostOption: true,
        showSortOption: true,
    }

     componentWillMount() {
        const category = this.props.routeProps.match.params.category;
        const locationPath = this.props.routeProps.location.pathname;
        this.setState(this.getNewState(category, locationPath));
    }

    componentWillReceiveProps(nextProps) {
        const category = nextProps.routeProps.match.params.category;
        const locationPath = nextProps.routeProps.location.pathname;
        this.setState(this.getNewState(category, locationPath));
    }

    getNewState = (category, locationPath) => {
        let newState = {
            ...this.state,
        }

        newState.category = category;

        if(locationPath.slice(1).split('/').length === 2) {
            // not showing post detail... so don't show navbar options...
            newState.showAddPostOption = false;
            newState.showSortOption = false;
        }
        else {
            // otherwise show navbar options....
            newState.showAddPostOption = true;
            newState.showSortOption = true;
        }

        return(newState);
    }

    handleSelect = (selectedKey) => {
        switch(selectedKey) {
            case "addPost":
                this.props.clearPostDetail(); // make sure we're not caching old data...
                this.state.showModal();
                break;
            case "voteSort.desc":
            case "authorSort.desc":
            case "dateSort.desc":
            case "voteSort.asc":
            case "authorSort.asc":
            case "dateSort.asc":
                this.props.sortBy(selectedKey);
                break;
            default:
                break;
        }
    }

    render() {
        const category = this.state.category;

        const title = category ? <Link to={`/`}>{'Readable'}</Link> : 'Readable';
        const subtitle = category ? ' : ' + category.charAt(0).toUpperCase() + category.slice(1) : '';

        let addPostOption = '';
        if(this.state.showAddPostOption) {
            addPostOption = (<NavItem eventKey={"addPost"} >Add</NavItem>);
        }

        let sortOption = '';
        if(this.state.showSortOption) {
            sortOption = (
                <NavDropdown title="Sort" id="basic-nav-dropdown">
                    <MenuItem eventKey={"dateSort.desc"}>Date (Newer/Older)</MenuItem>
                    <MenuItem eventKey={"dateSort.asc"}>Date (Older/Newer)</MenuItem>
                    <MenuItem eventKey={"authorSort.asc"}>Author (A to Z)</MenuItem>
                    <MenuItem eventKey={"authorSort.desc"}>Author (Z to A)</MenuItem>
                    <MenuItem eventKey={"voteSort.desc"}>Votes (High/Low)</MenuItem>
                    <MenuItem eventKey={"voteSort.asc"}>Votes (Low/High)</MenuItem>
                </NavDropdown>
            );
        }

        return (
            <div>
            <Navbar>
                <Navbar.Header>
                <Navbar.Brand>
                    { title }{ subtitle }
                </Navbar.Brand>
                </Navbar.Header>
            
                <Nav pullRight={true} onSelect={this.handleSelect}>
                    { addPostOption }
                    { sortOption }
                </Nav>
            </Navbar> 

            <AddPostModal connect={(callBackFunc) => {this.setState({ showModal: callBackFunc });}} />

        </div>
        );
    }
}

NavBar.propTypes = {
    routeProps: PropTypes.object,
    clearPostDetail: PropTypes.func,
    sortBy: PropTypes.func
};

export default connect(null, { clearPostDetail, sortBy })(NavBar);