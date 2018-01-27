import { connect } from 'react-redux'

import CandidacyList from '../components/CandidacyList'
import { listCandidacy, retrieveCounterCandidacy, requestCandidacy, approveCandidacy, disapproveCandidacy } from '../CandidacyActions'

const mapStateToProps = (state) => {
    return {
        candidacyList: state.candidacy.candidacyList,
        candidacyStateUpdate: state.candidacy.candidacyStateUpdate,
        candidacyCounter: state.candidacy.candidacyCounter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listCandidacy: (jobId, status, page = null, search = null) => {
            return dispatch(listCandidacy(jobId, status, page, search))
        },
        retrieveCounterCandidacy: (jobId) => {
            return dispatch(retrieveCounterCandidacy(jobId))
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

export default connect(mapStateToProps, mapDispatchToProps)(CandidacyList)
