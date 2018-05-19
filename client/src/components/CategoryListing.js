import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import { connect } from 'react-redux';
import { loadCategories } from '../actions';

class CategoryListing extends Component {

    componentWillMount() {
        this.props.loadCategories();
    }
    
    render() {
        const categories = this.props.categories;
        if(categories) {
            const categoryList = this.props.categories.map((category) => (
                <li key={`${category.name}`}><Link to={`/${category.path}`}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</Link></li>
            ));
    
            return (
                <Panel>
                    <Panel.Heading>
                        <Panel.Title><b>Categories</b></Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <ul className='list-unstyled'>
                            {categoryList}
                        </ul>
                    </Panel.Body>
                </Panel>
            );    
        }
        else {
            return null;
        }
    }
}

CategoryListing.propTypes = {
    loadCategories: PropTypes.func,
    categories: PropTypes.array
};

const mapStateToProps = (state) => {
	return({
        categories: state.categories,
	});
}

export default connect(mapStateToProps, { loadCategories })(CategoryListing);