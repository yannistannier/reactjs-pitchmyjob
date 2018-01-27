import request from '../utils/request'

import { LIST_NOTIFICATION, RETRIEVE_COUNTER_NOTIFICATION, MARK_AS_READ_NOTIFICATION } from './NotificationConstants'

export const listNotification = () => {
    return {
        type: LIST_NOTIFICATION,
        payload: request.get('/notifications/')
    }
}

export const retrieveCounterNotification = () => {
    return {
        type: RETRIEVE_COUNTER_NOTIFICATION,
        payload: request.get('/notifications/unread-count/')
    }
}

export const marketAsReadNotification = (id) => {
    return {
        type: MARK_AS_READ_NOTIFICATION,
        payload: request.put('/notifications/' + id + '/mark-as-read/'),
        meta: {
            id: id,
        }
    }
}
