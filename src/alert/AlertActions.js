import { CREATE_ALERT, DESTROY_ALERT } from './AlertConstants'

export const addAlert = (message, className='info') => {
    return {
        type: CREATE_ALERT,
        message: message,
        className: 'notification-bar-just-text notification-bar-' + className
    }
}

export const addAlertSuccess = (message) => {
    return addAlert(message, 'success')
}

export const addAlertError = (message) => {
    return addAlert(message, 'error')
}

export const hideAlert = (key) => {
    return {
        type: DESTROY_ALERT,
        key: key,
    }
}
