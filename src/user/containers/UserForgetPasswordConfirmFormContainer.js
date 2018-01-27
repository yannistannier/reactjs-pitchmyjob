import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import UserForgetPasswordConfirmForm from '../components/UserForgetPasswordConfirmForm'
import { forgetPasswordConfirmUser } from '../UserActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const config = {
    form: 'UserForgetPasswordConfirmForm',
    onSubmit: (values, dispatch, props) => {
        // Adds email and token value from URLs to submitted values
        values = {
            ...props.params,
            ...values,
        }

        return dispatch(forgetPasswordConfirmUser(values))
            .then((response) => {
                dispatch(addAlertSuccess('Mot de passe réinitialisé'))
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default connect(mapStateToProps, null)(reduxForm(config)(UserForgetPasswordConfirmForm))
