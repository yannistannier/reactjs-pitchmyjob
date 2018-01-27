import { connect } from 'react-redux'

import MessagePanel from '../components/MessagePanel'

import { retrieveCandidacy } from '../../candidacy/CandidacyActions'
import { listCandidacyMessage, nextCandidacyMessage } from '../MessageActions'

const mapStateToProps = (state) => {
    return {
        candidacyActive: state.candidacy.candidacyActive,
        candidacyMessageList: state.message.candidacyMessageList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveCandidacy: (candidacyId) => {
            return dispatch(retrieveCandidacy(candidacyId))
        },
        listCandidacyMessage: (candidacyId) => {
            return dispatch(listCandidacyMessage(candidacyId))
        },
        nextCandidacyMessage: (candidacyId, cursor) => {
            return dispatch(nextCandidacyMessage(candidacyId, cursor))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePanel)
