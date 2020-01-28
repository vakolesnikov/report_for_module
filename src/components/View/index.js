import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

export default class View extends React.Component {
    static propTypes = {
        actionInitApp: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const { actionInitApp } = props;

        actionInitApp();
        this.state = {
            isVisibleSearchInput: false
        };
    }

    render() {
        const { isVisibleSearchInput } = this.state;

        return <div className="main-container">hello</div>;
    }
}
