import React from 'react';
import ReactDatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import CustomInput from './CustomInput';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const DatePicker = props => (
    <ReactDatePicker locale={ru} customInput={<CustomInput />} {...props} />
);

export default DatePicker;
