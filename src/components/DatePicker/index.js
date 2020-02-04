import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import Select from '../Select';
import CustomInput from './CustomInput';
import { MONTHS, MONTHS_FROM_CURRENT_DAY } from '../../constants';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const years = new Array(11).fill(2010).map((year, index) => year + index);

const generateOptions = options => options.map(option => ({ title: option, value: option }));

const DatePicker = props => {
    const customHeader = ({ date, changeYear, changeMonth }) => {
        const yearsOptions = generateOptions(years);
        const monthsOptions = generateOptions(MONTHS);
        const { selected } = props;

        const slectedDay = selected.getDate();
        const selectedMonth = selected.getMonth();
        const selectedYear = selected.getFullYear();

        return (
            <div className="custom-header">
                <div className="selected-day">
                    {slectedDay}, {MONTHS_FROM_CURRENT_DAY[selectedMonth]}
                </div>
                <div className="select-container">
                    <Select
                        className="date-select"
                        onChange={({ value }) => changeYear(value)}
                        options={yearsOptions}
                        defaultSelectOptions={yearsOptions.find(
                            year => year.value === selectedYear
                        )}
                    />

                    <Select
                        className="date-select"
                        onChange={({ value }) => changeMonth(MONTHS.indexOf(value))}
                        options={monthsOptions}
                        defaultSelectOptions={monthsOptions[selectedMonth]}
                    />
                </div>
                <div className="current-month">{MONTHS[date.getMonth()]}</div>
            </div>
        );
    };

    return (
        <ReactDatePicker
            {...props}
            locale={ru}
            customInput={<CustomInput />}
            renderCustomHeader={customHeader}
        />
    );
};

DatePicker.propTypes = {
    selected: PropTypes.object.isRequired
};

export default DatePicker;
