import { reduxForm } from 'redux-form'

import MessagePanelForm from '../components/MessagePanelForm'
import { createMessage } from '../MessageActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const config = {
    form: 'MessagePanelForm',
    onSubmit: (values, dispatch, props) => {
        // Adds candidacyId to form values
        values['candidacy'] = props.candidacyId

        return dispatch(createMessage(values))
            .then((response) => {
                props.reset()
                dispatch(addAlertSuccess('Message ajouté'))
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default reduxForm(config)(MessagePanelForm)
