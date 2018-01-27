import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import JobForm from '../components/JobForm'
import { listContractType } from '../../contracttype/ContractTypeActions'
import { listExperience } from '../../experience/ExperienceActions'
import { listStudyLevel } from '../../studylevel/StudyLevelActions'
import { retrieveJob, updateJob } from '../JobActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const mapStateToProps = (state) => {
    return {
        contractType: state.contractType,
        experience: state.experience,
        studyLevel: state.studyLevel,
        job: state.job.jobActive.job,
        initialValues: state.job.jobActive.job,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listContractType: () => {
            return dispatch(listContractType())
        },
        listExperience: () => {
            return dispatch(listExperience())
        },
        listStudyLevel: () => {
            return dispatch(listStudyLevel())
        },
        retrieveJob: (id) => {
            return dispatch(retrieveJob(id))
        },
    }
}

const config = {
    form: 'JobUpdateForm',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
        // TODO: find something to handle file / image upload
        // If logo unchanged, do not pass it to PUT request
        if (values['logo'] === props.job['logo']) {
            delete values['logo']
        }

        if (!Array.isArray(values['skills'])) {
            values['skills'] = values['skills'].split(',')
        }

        return dispatch(updateJob(props.job.id, values))
            .then((response) => {
                dispatch(addAlertSuccess('Job modifié'))
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(config)(JobForm))
