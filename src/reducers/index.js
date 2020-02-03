import * as actionTypes from '../actionTypes';

const initialState = {
    participants: [],
    selectedParticipantAccount: {},
    selectedParticipant: {},
    historyOperations: [],
    loadHistoryStatus: '',
    historyOperationsParams: {
        start: null,
        end: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PARTICIPANTS: {
            const participants = action.params;

            return {
                ...state,
                participants
            };
        }

        case actionTypes.SET_SELECTED_PARTICIPANT: {
            return {
                ...state,
                selectedParticipant: action.params
            };
        }

        case actionTypes.SET_SELECTED_PARTICIPANT_ACCOUNTS: {
            return {
                ...state,
                selectedParticipantAccount: action.params
            };
        }

        case actionTypes.SET_HISTORY_OPERATIONS: {
            return {
                ...state,
                historyOperations: action.params
            };
        }

        case actionTypes.SET_HISTORY_OPERATIONS_PARAMS: {
            return {
                ...state,
                historyOperationsParams: action.params
            };
        }

        case actionTypes.GET_HISTORY_REQUEST: {
            return {
                ...state,
                loadHistoryStatus: 'request'
            };
        }

        case actionTypes.GET_HISTORY_SUCCESS: {
            return {
                ...state,
                loadHistoryStatus: 'success'
            };
        }

        case actionTypes.GET_HISTORY_FAILURE: {
            return {
                ...state,
                loadHistoryStatus: 'failure'
            };
        }

        default: {
            return state;
        }
    }
};
