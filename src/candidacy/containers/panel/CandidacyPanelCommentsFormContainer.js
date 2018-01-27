import { reduxForm } from 'redux-form'

import CandidacyPanelCommentsForm from '../../components/panel/CandidacyPanelCommentsForm'
import { createCommentCandidacy } from '../../CandidacyActions'
import { addAlertSuccess } from '../../../alert/AlertActions'
import { handleFormErrors  } from '../../../utils/forms/formatters'

const config = {
    form: 'CandidacyPanelCommentsForm',
    onSubmit: (values, dispatch, props) => {
        // Adds candidacyId to form values
        values['candidacy'] = props.candidacyId

        return dispatch(createCommentCandidacy(values))
            .then((response) => {
                props.reset()
                dispatch(addAlertSuccess('Commentaire ajouté'))
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default reduxForm(config)(CandidacyPanelCommentsForm)
