import { reduxForm } from 'redux-form'

import UserLoginForm from '../components/UserLoginForm'
import request from '../../utils/request'
import { loginUser, retrieveUserFromToken } from '../UserActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const config = {
    form: 'UserLoginForm',
    onSubmit: (values, dispatch, props) => {
        return dispatch(loginUser(values))
            .then((response) => {
                localStorage.setItem('token', response.action.payload.data.token)
                request.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token')

                dispatch(retrieveUserFromToken(localStorage.getItem('token')))
                    .then((response) => {
                        dispatch(addAlertSuccess('Vous êtes connecté'))
                        props.router.push('/')
                    })

            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default reduxForm(config)(UserLoginForm)
