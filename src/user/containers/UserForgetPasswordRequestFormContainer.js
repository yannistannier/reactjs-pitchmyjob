import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import UserForgetPasswordRequestForm from '../components/UserForgetPasswordRequestForm'
import { forgetPasswordRequestUser } from '../UserActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const mapStateToProps = (state) => {
    return {
        forgetPasswordRequested: state.user.forgetPasswordRequested,
    }
}

const config = {
    form: 'UserForgetPasswordRequestForm',
    onSubmit: (values, dispatch, props) => {
        return dispatch(forgetPasswordRequestUser(values))
            .catch((error) => {
                // TODO: handle "detail" error corresponding to "not found"
                handleFormErrors(error.response, true)
            })
    },
}

export default connect(mapStateToProps, null)(reduxForm(config)(UserForgetPasswordRequestForm))
