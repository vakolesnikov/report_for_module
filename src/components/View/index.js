import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';

function getFormatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const newMonth = month > 9 ? month : `0${month}`;
    const newDay = day > 9 ? day : `0${day}`;

    return `${year}-${newMonth}-${newDay}`;
}

export default class View extends React.Component {
    static propTypes = {
        participants: PropTypes.arrayOf(PropTypes.any).isRequired,
        historyOperations: PropTypes.arrayOf(PropTypes.any).isRequired,
        selectedParticipantAccount: PropTypes.objectOf(PropTypes.any).isRequired,
        handleSetSelectedParticipant: PropTypes.func.isRequired,
        handleGetReport: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.currentDate = new Date();
        const currentYear = this.currentDate.getFullYear();
        const currentMonth = this.currentDate.getMonth();

        this.state = {
            selectedOption: '',
            startDate: new Date(currentYear, currentMonth),
            endDate: this.currentDate
        };
    }

    handleChange = selectedOption => {
        const { handleSetSelectedParticipant } = this.props;
        const { label, value } = selectedOption;

        this.setState({ selectedOption });
        handleSetSelectedParticipant({ name: label, participantId: value });
    };

    handleStartDateChange = startDate => this.setState({ startDate });

    handleEndDateChange = endDate => this.setState({ endDate });

    render() {
        const { selectedOption, startDate, endDate } = this.state;
        const { participants, historyOperations, handleGetReport } = this.props;

        const options = participants.map(({ participantId, name }) => ({
            label: name,
            value: participantId
        }));

        const formattedStartDate = getFormatDate(startDate);
        const formattedEndDate = getFormatDate(endDate);

        return (
            <div className="main-container">
                <h1 className="main-title">
                    Модуль формирования финансового отчета «Account Register»
                </h1>
                <div className="participant-select-panel">
                    <span className="participant-select-title">УОТ:</span>
                    <Select
                        className="participant-select common-select"
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        placeholder="Выберите УОТ..."
                    />
                </div>
                <div className="date-select-panel">
                    <DatePicker
                        placeholderText="Введите начальную дату"
                        onChange={this.handleStartDateChange}
                        selected={startDate}
                        maxDate={endDate}
                    />
                    <DatePicker
                        placeholderText="Введите конечную дату"
                        onChange={this.handleEndDateChange}
                        selected={endDate}
                        maxDate={this.currentDate}
                        minDate={startDate}
                    />
                </div>

                <button
                    onClick={() => handleGetReport({ formattedStartDate, formattedEndDate })}
                    type="button"
                >
                    Сформировать отчет
                </button>
                <input type="date" />
                <table>
                    <tbody>
                        {historyOperations.map(operation => (
                            <tr key={operation.id}>
                                <td>{operation.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
