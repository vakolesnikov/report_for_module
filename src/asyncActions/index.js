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
    const { start, end } = params;
    const { id, participantId } = getState().selectedParticipantAccount;
    dispatch(actions.getHistoryRequest());

    api.getHistoryOperations(participantId, id, { start, end }).then(res => {
        if (res.result && res.result.length) {
            dispatch(actions.setHistoryOperations(res.result));
            dispatch(actions.getHistorySuccess());
            dispatch(actions.setHistoryOperationsParams({ start, end }));
        } else {
            dispatch(actions.getHistoryFailure());
        }
    });
};

export const updateReport = (dispatch, getState) => {
    const {
        historyOperationsParams: { start, end },
        selectedParticipantAccount: { id, participantId }
    } = getState();

    if (id && participantId && start && end) {
        getReport({ start, end })(dispatch, getState);
    }
};
