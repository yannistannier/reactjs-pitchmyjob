import { LIST_NOTIFICATION_PENDING, LIST_NOTIFICATION_FULFILLED, LIST_NOTIFICATION_REJECTED,
         RETRIEVE_COUNTER_NOTIFICATION_PENDING, RETRIEVE_COUNTER_NOTIFICATION_FULFILLED, RETRIEVE_COUNTER_NOTIFICATION_REJECTED,
         MARK_AS_READ_NOTIFICATION_PENDING, MARK_AS_READ_NOTIFICATION_FULFILLED, MARK_AS_READ_NOTIFICATION_REJECTED
} from './NotificationConstants'

const INITIAL_STATE = {
    notificationToggle: false,
    notificationList: {pending: false, fetched: false, error: null, notifications: [], pagination: null},
    notificationCounter: {pending: false, fetched: false, error: null, unreadCount: 0},
    notificationMarkAsRead: {pending: false, fetched: false, error: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_NOTIFICATION_PENDING:
            return {...state, notificationList: {...state.notificationList, pending: true, fetched: false, error: null, notifications: []}}
        case LIST_NOTIFICATION_FULFILLED:
            return {...state, notificationList: {pending: false, fetched: true, error: null, notifications: action.payload.data.results, pagination: {...action.payload.data, results: undefined}}}
        case LIST_NOTIFICATION_REJECTED:
            return {...state, notificationList: {pending: false, fetched: false, error: action.payload.response, notifications: [], pagination: null}}

        // RETRIEVE COUNTER
        case RETRIEVE_COUNTER_NOTIFICATION_PENDING:
            return {...state, notificationCounter: {pending: true, fetched: false, error: null, unreadCount: 0}}
        case RETRIEVE_COUNTER_NOTIFICATION_FULFILLED:
            return {...state, notificationCounter: {pending: false, fetched: true, error: null, unreadCount: action.payload.data.unread_count}}
        case RETRIEVE_COUNTER_NOTIFICATION_REJECTED:
            return {...state, notificationCounter: {pending: false, fetched: false, error: action.payload.response, unreadCount: 0}}

        // MARK AS READ
        case MARK_AS_READ_NOTIFICATION_PENDING:
            return {...state, notificationMarkAsRead: {pending: true, fetched: false, error: null}}
        case MARK_AS_READ_NOTIFICATION_FULFILLED:
            return {
                ...state,
                notificationMarkAsRead: {pending: false, fetched: true, error: null},
                notificationCounter: {...state.notificationCounter, unreadCount: state.notificationCounter.unreadCount - 1},
                notificationList: {...state.notificationList, notifications: state.notificationList.notifications.map((notification) => {
                    if (notification.id === action.meta.id) {
                        notification.is_unread = false
                    }
                    return notification
                })}
        }
        case MARK_AS_READ_NOTIFICATION_REJECTED:
            return {...state, notificationMarkAsRead: {pending: false, fetched: false, error: action.payload.response}}

        // DEFAULT
        default:
            return state
    }
}
