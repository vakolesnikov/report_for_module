import React from 'react';
import ReactDatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import Select from '../Select';

import CustomInput from './CustomInput';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const years = new Array(11).fill(2010).map((year, index) => year + index);

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];
const monthsFromCurrentDay = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

const generateOptions = options => options.map(option => ({ title: option, value: option }));

const DatePicker = props => {
    const customHeader = ({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
    }) => {
        const yearsOptions = generateOptions(years);
        const monthsOptions = generateOptions(months);
        const { selected } = props;

        const slectedDay = selected.getDate();
        const selectedMonth = selected.getMonth();
        const selectedYear = selected.getFullYear();

        return (
            <div className="custom-header">
                <div className="selected-day">
                    {slectedDay}, {monthsFromCurrentDay[selectedMonth]}
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
                        onChange={({ value }) => changeMonth(months.indexOf(value))}
                        options={monthsOptions}
                        defaultSelectOptions={monthsOptions[selectedMonth]}
                    />
                </div>
                <div className="current-month">{months[date.getMonth()]}</div>
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

export default DatePicker;
