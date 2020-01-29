import * as api from '../api';
import * as actions from '../actions';

export const initApp = dispatch => {
    api.getParticipants().then(participants => {
        dispatch(actions.setParticipants(participants));
        if (participants.length) {
            actions.setSelectedParticipant(participants[0]);
        }
    });
};

export const getAccounts = selectedParticipants => dispatch => {
    api.getAccountsOfParticipants(selectedParticipants.participantId).then(accounts =>
        dispatch(actions.setSelectedParticipantAccounts(accounts))
    );

    dispatch(actions.setSelectedParticipant(selectedParticipants));
};
