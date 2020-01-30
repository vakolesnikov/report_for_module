import React from 'react';
import ReactDatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import CustomInput from './CustomInput';
import './index.css';

const DatePicker = props => (
    <ReactDatePicker locale={ru} customInput={<CustomInput />} {...props} />
);

export default DatePicker;
