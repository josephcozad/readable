import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import * as ReadableApi from '../utils/Api';

class CategoryListing extends Component {

    state = {
        categories: []
    }

     componentWillMount() {
        ReadableApi.getCategories().then((categories) => {
            this.setState({ categories: categories });
        });
     }

    render() {
        const categoryList = this.state.categories.map((category) => (
            <li key={`${category.name}`}><Link to={`/${category.path}`}>{category.name}</Link></li>
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
}

// CategoryListing.propTypes = {

// };

export default CategoryListing;