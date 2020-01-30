import React from 'react';
/* eslint-disable */
export default class ExampleCustomInput extends React.Component {
    render() {
        const { value, onClick } = this.props;

        return (
            <button className="custom-input" onClick={onClick} type="button">
                {value}
            </button>
        );
    }
}
