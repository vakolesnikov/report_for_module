import * as actionTypes from '../actionTypes';

const initialState = {
    participants: [],
    selectedParticipantAccounts: [],
    selectedParticipant: {}
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
                selectedParticipantAccounts: action.params
            };
        }

        default: {
            return state;
        }
    }
};
