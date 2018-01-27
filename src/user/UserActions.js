import request from '../utils/request'

import { ACTIVATE_USER, LOGIN_USER, RETRIEVE_FROM_TOKEN_USER, FORGET_PASSWORD_REQUEST_USER,
         FORGET_PASSWORD_CONFIRM_USER, EMAIL_NOT_EXISTS_USER, UPDATE_USER
} from './UserConstants'

export function activateUser(email, token) {
    return {
        type: ACTIVATE_USER,
        payload: request.put('/auth/pro/confirm/', {email, token})
    }
}

export function loginUser(values) {
    return {
        type: LOGIN_USER,
        payload: request.post('/auth/pro/login/', values)
    }
}

export const retrieveUserFromToken = (token) => {
    return {
        type: RETRIEVE_FROM_TOKEN_USER,
        payload: request.get('/auth/me/')
    }
}

export const forgetPasswordRequestUser = (values) => {
    return {
        type: FORGET_PASSWORD_REQUEST_USER,
        payload: request.put('/auth/forget-password-request/', values)
    }
}

export const forgetPasswordConfirmUser = (values) => {
    return {
        type: FORGET_PASSWORD_CONFIRM_USER,
        payload: request.put('/auth/forget-password-confirm/', values)
    }
}

export const emailNotExistsUser = (values) => {
    return {
        type: EMAIL_NOT_EXISTS_USER,
        payload: request.post('/auth/email-not-exists/', values)
    }
}

export const updateUser = (values) => {
    return {
        type: UPDATE_USER,
        payload: request.put('/auth/me/', values)
    }
}
