import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import JobQuestionForm from '../components/JobQuestionForm'
import { listJobQuestion, updateJobQuestion } from '../JobQuestionActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const mapDispatchToProps = (dispatch) => {
    return {
        listJobQuestion: (jobId) => {
            return dispatch(listJobQuestion(jobId))
        },
    }
}

const config = {
    form: 'JobQuestionForm',
    onSubmit: (values, dispatch, props) => {
        let isCreatingProcess = false
        if (props.location.state !== undefined) {
            isCreatingProcess = props.location.state.hasOwnProperty('creatingProcess')
        }

        return dispatch(updateJobQuestion(values['id'], values))
            .then((response) => {
                if (isCreatingProcess) {
                    props.router.push({
                        pathname: '/jobs/' + props.params.jobId + '/publish/',
                        state: { creatingProcess: true },
                    })
                }
                else {
                    dispatch(addAlertSuccess('Question modifié'))
                }
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default connect(null, mapDispatchToProps)(reduxForm(config)(JobQuestionForm))
