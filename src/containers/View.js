import { connect } from 'react-redux';

import View from '../components/View';
import { getAccounts, getReport } from '../asyncActions';

const mapStateToProps = state => ({
    participants: state.participants,
    selectedParticipantAccount: state.selectedParticipantAccount,
    historyOperations: state.historyOperations
});

const mapDispatchToProps = dispatch => ({
    handleSetSelectedParticipant: participant => dispatch(getAccounts(participant)),
    handleGetReport: params => dispatch(getReport(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
