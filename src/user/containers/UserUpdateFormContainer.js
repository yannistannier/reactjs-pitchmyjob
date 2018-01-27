import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import UserUpdateForm from '../components/UserUpdateForm'
import { updateUser } from '../UserActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        initialValues: state.user.currentUser,
    }
}

const config = {
    form: 'UserUpdateForm',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
        // TODO: find something to handle file / image upload
        // If photo unchanged, do not pass it to PUT request
        if (values['photo'] === props.user['photo']) {
            delete values['photo']
        }

        return dispatch(updateUser(values))
            .then((response) => {
                dispatch(addAlertSuccess('Profil modifié'))
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default connect(mapStateToProps, null)(reduxForm(config)(UserUpdateForm))
