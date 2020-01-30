import * as actionTypes from '../actionTypes';

const createAction = type => params => ({
    type,
    params
});

export const setParticipants = createAction(actionTypes.SET_PARTICIPANTS);
export const setSelectedParticipant = createAction(actionTypes.SET_SELECTED_PARTICIPANT);
export const setSelectedParticipantAccount = createAction(
    actionTypes.SET_SELECTED_PARTICIPANT_ACCOUNTS
);

export const setHistoryOperations = createAction(actionTypes.SET_HISTORY_OPERATIONS);
