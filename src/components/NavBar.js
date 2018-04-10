import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem  } from 'react-bootstrap';

// Navbar fixedTop='true'

class NavBar extends Component {

    state = {
        category: null
    }

     componentWillMount() {
        const {category} = this.props.routProps.match.params;
        this.setState({ category: category});
    }

    render() {
        const category = this.state.category;

        const title = category ? <Link to={`/`}>{'Readable'}</Link> : 'Readable';
        const subtitle = category ? ':' + category : '';

        return (
            <Navbar>
                <Navbar.Header>
                <Navbar.Brand>
                    { title }{ subtitle }
                </Navbar.Brand>
                </Navbar.Header>
            
                <Nav pullRight={true}>
                    <NavItem eventKey={1} href="#">
                        Add
                    </NavItem>
                    <NavDropdown eventKey={2} title="Sort" id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>By Votes</MenuItem>
                        <MenuItem eventKey={2.2}>By Author</MenuItem>
                        <MenuItem eventKey={2.3}>By Date</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar> 
        );
    }
}

// NavBar.propTypes = {

// };

export default NavBar;