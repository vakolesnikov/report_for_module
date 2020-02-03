import React from 'react';
import PropTypes from 'prop-types';
// import Select from 'react-select';
import { getFormattedDate } from '../../helpers';
import DatePicker from '../DatePicker';
import Report from '../Report';
import Button from '../Button';
import Select from '../Select';
import UserIcon from '../../ui/UserIcon';

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
        const { title, value } = selectedOrganization;

        this.setState({ selectedOrganization });
        handleSetSelectedParticipant({ name: title, participantId: value });
    };

    handleStartDateChange = startDate => this.setState({ startDate });

    handleEndDateChange = endDate => this.setState({ endDate });

    render() {
        const { selectedOrganization, startDate, endDate } = this.state;
        const { participants, loadHistoryStatus, handleGetReport, historyOperations } = this.props;

        const selectOrganizationOptions = participants.map(({ participantId, name }) => ({
            title: name,
            value: participantId
        }));

        const formattedStartDate = getFormattedDate(startDate);
        const formattedEndDate = getFormattedDate(endDate);

        return (
            <div className="main-container">
                <div className="top-navigation-panel">
                    <div className="top-navigation-panel__item">
                        <Select
                            className="user-select"
                            options={selectOrganizationOptions}
                            onChange={this.handleOrganizationChange}
                            OptionIcon={UserIcon}
                            SelectIcon={UserIcon}
                            title="Пользователь"
                        />
                    </div>

                    <div className="top-navigation-panel__item select-date-item">
                        <span className="top-navigation-panel__item-title">Начальная дата</span>
                        <DatePicker
                            onChange={this.handleStartDateChange}
                            selected={startDate}
                            maxDate={endDate}
                            dateFormat="dd.MM.yyyy"
                        />
                    </div>

                    <div className="top-navigation-panel__item select-date-item">
                        <span className="top-navigation-panel__item-title">Конечная дата</span>
                        <DatePicker
                            onChange={this.handleEndDateChange}
                            selected={endDate}
                            maxDate={this.currentDate}
                            minDate={startDate}
                            dateFormat="dd.MM.yyyy"
                            showMonthDropdown
                            showYearDropdown
                        />
                    </div>
                    <div className="top-navigation-panel__item report-button-container">
                        <Button
                            isDisabled={!selectedOrganization}
                            onClick={() =>
                                handleGetReport({
                                    start: formattedStartDate,
                                    end: formattedEndDate
                                })
                            }
                            text="Сформировать отчет"
                        />
                    </div>
                </div>

                <Report
                    historyOperations={historyOperations}
                    loadHistoryStatus={loadHistoryStatus}
                />
            </div>
        );
    }
}
