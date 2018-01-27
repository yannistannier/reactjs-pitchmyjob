import { connect } from 'react-redux'

import JobPublishForm from '../components/JobPublishForm'
import { retrieveJob, publishJob } from '../JobActions'
import { addAlertSuccess, addAlertError } from '../../alert/AlertActions'

const mapStateToProps = (state) => {
    return {
        job: state.job.jobActive,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        retrieveJob: (id) => {
            return dispatch(retrieveJob(id))
        },
        publishJob: (id) => {
            return dispatch(publishJob(id))
                .then((response) => {
                    ownProps.router.push('/jobs/')
                    dispatch(addAlertSuccess('L\'offre a été publié'))
                })
                .catch((error) => {
                    dispatch(addAlertError('Une erreur est survenue lors de la publication de l\'offre'))
                })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobPublishForm)
