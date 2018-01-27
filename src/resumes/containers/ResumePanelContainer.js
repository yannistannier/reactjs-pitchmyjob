import { connect } from 'react-redux'

import ResumePanel from '../components/ResumePanel'
import { requestCandidacy } from '../../candidacy/CandidacyActions'
import { retrieveResume, existsCandidacyResume } from '../ResumeActions'
import { addAlertSuccess } from '../../alert/AlertActions'

const mapStateToProps = (state) => {
    return {
        resumeActive: state.resume.resumeActive,
        existsCandidacy: state.resume.existsCandidacy,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveResume: (applicantId) => {
            return dispatch(retrieveResume(applicantId))
        },
        existsCandidacyResume: (jobId, applicantId) => {
            return dispatch(existsCandidacyResume(jobId, applicantId))
        },
        requestCandidacy: (jobId, applicantId) => {
            return dispatch(requestCandidacy(jobId, applicantId))
                .then((response) => {
                    dispatch(addAlertSuccess('Demande de vidéo faites'))
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumePanel)
