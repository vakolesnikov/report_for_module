import React from 'react';
import CalendarIcon from '../../ui/CalendarIcon';
/* eslint-disable */
export default class ExampleCustomInput extends React.Component {
    render() {
        const { value, onClick } = this.props;

        return (
            <button className="custom-input" onClick={onClick} type="button">
                {value} <CalendarIcon/>
            </button>
        );
    }
}
