import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getFormattedDate } from '../../helpers';
import DatePicker from '../DatePicker';
import Report from '../Report';
import Button from '../Button';
import './index.css';

export default class View extends React.Component {
    static propTypes = {
        participants: PropTypes.arrayOf(PropTypes.any).isRequired,
        historyOperations: PropTypes.arrayOf(PropTypes.any).isRequired,
        handleSetSelectedParticipant: PropTypes.func.isRequired,
        handleGetReport: PropTypes.func.isRequired,
        loadHistoryStatus: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.currentDate = new Date();
        const currentYear = this.currentDate.getFullYear();
        const currentMonth = this.currentDate.getMonth();

        this.state = {
            selectedOrganization: '',
            startDate: new Date(currentYear, currentMonth),
            endDate: this.currentDate
        };
    }

    handleOrganizationChange = selectedOrganization => {
        const { handleSetSelectedParticipant } = this.props;
        const { label, value } = selectedOrganization;

        this.setState({ selectedOrganization });
        handleSetSelectedParticipant({ name: label, participantId: value });
    };

    handleStartDateChange = startDate => this.setState({ startDate });

    handleEndDateChange = endDate => this.setState({ endDate });

    render() {
        const { selectedOrganization, startDate, endDate } = this.state;
        const { participants, loadHistoryStatus, handleGetReport, historyOperations } = this.props;

        const selectOrganizationOptions = participants.map(({ participantId, name }) => ({
            label: name,
            value: participantId
        }));

        const formattedStartDate = getFormattedDate(startDate);
        const formattedEndDate = getFormattedDate(endDate);

        return (
            <div className="main-container">
                <h1 className="main-title">
                    Модуль формирования финансового отчета «Account Register»
                </h1>
                <div className="select-panel">
                    <div className="select-panel-item">
                        <span className="select-panel-title">Выберите УОТ:</span>
                        <Select
                            className="participant-select common-select"
                            value={selectedOrganization}
                            onChange={this.handleOrganizationChange}
                            options={selectOrganizationOptions}
                            placeholder="не выбрано"
                        />
                    </div>

                    <div className="select-panel-item">
                        <span className="select-panel-title">Выберите начальную дату</span>
                        <DatePicker
                            onChange={this.handleStartDateChange}
                            selected={startDate}
                            maxDate={endDate}
                        />
                    </div>
                    <div className="select-panel-item">
                        <span className="select-panel-title">Выберите конечную дату</span>
                        <DatePicker
                            onChange={this.handleEndDateChange}
                            selected={endDate}
                            maxDate={this.currentDate}
                            minDate={startDate}
                        />
                    </div>
                </div>

                <Button
                    isDisabled={!selectedOrganization}
                    onClick={() =>
                        handleGetReport({ start: formattedStartDate, end: formattedEndDate })
                    }
                    text="Сформировать отчет"
                />

                <Report
                    historyOperations={historyOperations}
                    loadHistoryStatus={loadHistoryStatus}
                />
            </div>
        );
    }
}
