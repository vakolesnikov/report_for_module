import { connect } from 'react-redux';

import View from '../components/View';
import { getAccounts } from '../asyncActions';

const mapStateToProps = state => ({
    participants: state.participants,
    selectedParticipantAccounts: state.selectedParticipantAccounts
});

const mapDispatchToProps = dispatch => ({
    handleSetSelectedParticipant: participant => dispatch(getAccounts(participant))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
