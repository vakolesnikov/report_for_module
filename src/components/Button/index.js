import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Button = ({ onClick, isDisabled, text }) => (
    <button
        onClick={onClick}
        type="button"
        className={`main-button${isDisabled ? ' main-button__disable' : ''}`}
        disabled={isDisabled}
    >
        {text}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    text: PropTypes.any.isRequired
};

export default Button;
