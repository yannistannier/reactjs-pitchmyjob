import { connect } from 'react-redux'

import CandidacyPanel from '../components/CandidacyPanel'
import { retrieveCandidacy, listCommentsCandidacy, nextCommentsCandidacy, requestCandidacy, approveCandidacy, disapproveCandidacy } from '../CandidacyActions'

const mapStateToProps = (state) => {
    return {
        candidacyActive: state.candidacy.candidacyActive,
        candidacyStateUpdate: state.candidacy.candidacyStateUpdate,
        commentsCandidacyList: state.candidacy.commentsCandidacyList,
        currentUser: state.user.currentUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        retrieveCandidacy: (id) => {
            return dispatch(retrieveCandidacy(id))
        },
        listCommentsCandidacy: (candidacyId) => {
            return dispatch(listCommentsCandidacy(candidacyId))
        },
        nextCommentsCandidacy: (candidacyId, cursor) => {
            return dispatch(nextCommentsCandidacy(candidacyId, cursor))
        },
        requestCandidacy: (jobId, applicantId, candidacyId) => {
            return dispatch(requestCandidacy(jobId, applicantId, candidacyId))
        },
        approveCandidacy: (candidacyId) => {
            return dispatch(approveCandidacy(candidacyId))
        },
        disapproveCandidacy: (candidacyId) => {
            return dispatch(disapproveCandidacy(candidacyId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidacyPanel)
