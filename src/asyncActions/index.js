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
    api.getAccountsOfParticipants(selectedParticipants.participantId).then(accounts => {
        if (accounts.length) {
            dispatch(actions.setSelectedParticipantAccount(accounts[0]));
        }
    });

    dispatch(actions.setSelectedParticipant(selectedParticipants));
};

export const getReport = params => (dispatch, getState) => {
    const { formattedStartDate: start, formattedEndDate: end } = params;
    const { id, participantId } = getState().selectedParticipantAccount;
    api.getHistoryOperations(participantId, id, { start, end }).then(res =>
        dispatch(actions.setHistoryOperations(res.result))
    );
};
