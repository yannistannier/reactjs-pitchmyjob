import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import JobForm from '../components/JobForm'
import { listContractType } from '../../contracttype/ContractTypeActions'
import { listExperience } from '../../experience/ExperienceActions'
import { listStudyLevel } from '../../studylevel/StudyLevelActions'
import { retrievePro } from '../../pro/ProActions'
import { createJob } from '../JobActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const mapStateToProps = (state) => {
    return {
        contractType: state.contractType,
        experience: state.experience,
        studyLevel: state.studyLevel,
        pro: state.pro.pro,
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
        retrievePro: () => {
            return dispatch(retrievePro())
        },
    }
}

const config = {
    form: 'JobCreateForm',
    onSubmit: (values, dispatch, props) => {
        // TODO: find something to handle file / image upload
        // If logo unchanged, do not pass it to PUT request
        if (values['logo'] === props.pro['logo']) {
            delete values['logo']
        }

        if (!Array.isArray(values['skills'])) {
            values['skills'] = values['skills'].split(',')
        }

        return dispatch(createJob(values))
            .then((response) => {
                props.router.push({
                    pathname: '/jobs/' + response.value.data.id + '/question/',
                    state: { creatingProcess: true },
                })
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(config)(JobForm))
