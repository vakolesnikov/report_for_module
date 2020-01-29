import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './index.css';

export default class View extends React.Component {
    static propTypes = {
        participants: PropTypes.arrayOf(PropTypes.any).isRequired,
        selectedParticipantAccounts: PropTypes.arrayOf(PropTypes.any).isRequired,
        handleSetSelectedParticipant: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: ''
        };
    }

    handleChange = selectedOption => {
        const { handleSetSelectedParticipant } = this.props;
        const { label, value } = selectedOption;

        this.setState({ selectedOption });
        handleSetSelectedParticipant({ name: label, participantId: value });
    };

    render() {
        const { selectedOption } = this.state;
        const { participants, selectedParticipantAccounts } = this.props;
        const options = participants.map(({ participantId, name }) => ({
            label: name,
            value: participantId
        }));

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
            </div>
        );
    }
}
