import { reduxForm } from 'redux-form'

import ResumePanelContactForm from '../components/ResumePanelContactForm'
import { requestCandidacy } from '../../candidacy/CandidacyActions'
import { createMessage } from '../../message/MessageActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const config = {
    form: 'ResumePanelContactForm',
    onSubmit: (values, dispatch, props) => {
        return dispatch(requestCandidacy(props.jobId, props.applicantId))
            .then((response) => {
                values['candidacy'] = response['value']['data']['id']

                return dispatch(createMessage(values))
                    .then((response) => {
                        dispatch(addAlertSuccess('Message envoyé'))
                        props.onClose()
                    })
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default reduxForm(config)(ResumePanelContactForm)
