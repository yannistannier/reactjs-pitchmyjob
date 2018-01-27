import { LIST_JOB_CANDIDACY_MESSAGE_PENDING, LIST_JOB_CANDIDACY_MESSAGE_FULFILLED, LIST_JOB_CANDIDACY_MESSAGE_REJECTED,
         LIST_CANDIDACY_MESSAGE_PENDING, LIST_CANDIDACY_MESSAGE_FULFILLED, LIST_CANDIDACY_MESSAGE_REJECTED,
         NEXT_CANDIDACY_MESSAGE_PENDING, NEXT_CANDIDACY_MESSAGE_FULFILLED, NEXT_CANDIDACY_MESSAGE_REJECTED,
         CREATE_MESSAGE_PENDING, CREATE_MESSAGE_FULFILLED, CREATE_MESSAGE_REJECTED,
         RETRIEVE_COUNTER_MESSAGE_PENDING, RETRIEVE_COUNTER_MESSAGE_FULFILLED, RETRIEVE_COUNTER_MESSAGE_REJECTED,
         LIST_NOTIFICATION_MESSAGE_PENDING, LIST_NOTIFICATION_MESSAGE_FULFILLED, LIST_NOTIFICATION_MESSAGE_REJECTED,
         MARK_AS_READ_MESSAGE
} from './MessageConstants'

const INITIAL_STATE = {
    messageActive: {pending: false, fetched: false, error: null, message: null},
    jobCandidacyMessageList: {pending: false, fetched: false, error: null, jobCandidacyMessages: [], pagination: null},
    candidacyMessageList: {pending: false, fetched: false, nextPending: false, nextFetched: false, error: null, candidacyMessages: [], pagination: null},
    messageCounter: {pending: false, fetched: false, error: null, unreadCount: 0},
    notificationMessageList: {pending: false, fetched: false, error: null, notificationMessages: [], pagination: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST JOB CANDIDACY
        case LIST_JOB_CANDIDACY_MESSAGE_PENDING:
            return {
                ...state,
                jobCandidacyMessageList: {
                    ...state.jobCandidacyMessageList,
                    pending: true,
                    fetched: false,
                    error: null,
                    jobCandidacyMessages: []
                }
            }
        case LIST_JOB_CANDIDACY_MESSAGE_FULFILLED:
            return {
                ...state,
                jobCandidacyMessageList: {
                    pending: false,
                    fetched: true,
                    error: null,
                    jobCandidacyMessages: action.payload.data.results,
                    pagination: {...action.payload.data, results: undefined}
                }
            }
        case LIST_JOB_CANDIDACY_MESSAGE_REJECTED:
            return {
                ...state,
                jobCandidacyMessageList: {
                    pending: false,
                    fetched: false,
                    error: action.payload.response,
                    jobCandidacyMessages: [],
                    pagination: null
                }
            }

        // LIST CANDIDACY MESSAGES
        case LIST_CANDIDACY_MESSAGE_PENDING:
            return {
                ...state,
                candidacyMessageList: {
                    ...state.candidacyMessageList,
                    pending: true,
                    fetched: false,
                    error: null,
                    candidacyMessages: []
                }
            }
        case LIST_CANDIDACY_MESSAGE_FULFILLED:
            return {
                ...state,
                candidacyMessageList: {
                    pending: false,
                    fetched: true,
                    error: null,
                    candidacyMessages: action.payload.data.results.reverse(),
                    pagination: {...action.payload.data, results: undefined}
                }
            }
        case LIST_CANDIDACY_MESSAGE_REJECTED:
            return {
                ...state,
                candidacyMessageList: {
                    pending: false,
                    fetched: false,
                    error: action.payload.response,
                    candidacyMessages: [],
                    pagination: null
                }
            }

        // NEXT CANDIDACY MESSAGES
        case NEXT_CANDIDACY_MESSAGE_PENDING:
            return {
                ...state,
                candidacyMessageList: {
                    ...state.candidacyMessageList,
                    nextPending: true,
                    nextFetched: false,
                    error: null
                }
            }
        case NEXT_CANDIDACY_MESSAGE_FULFILLED:
            return {
                ...state,
                candidacyMessageList: {
                    ...state.candidacyMessageList,
                    nextPending: false,
                    nextFetched: true,
                    error: null,
                    candidacyMessages: action.payload.data.results.reverse().concat(state.candidacyMessageList.candidacyMessages),
                    pagination: {...action.payload.data, results: undefined}
                }
            }
        case NEXT_CANDIDACY_MESSAGE_REJECTED:
            return {
                ...state,
                candidacyMessageList: {
                    ...state.candidacyMessageList,
                    nextPending: false,
                    nextFetched: false,
                    error: action.payload.response,
                    candidacyMessages: [],
                    pagination: null
                }
            }

        // CREATE
        case CREATE_MESSAGE_PENDING:
            return {...state, messageActive: {pending: true, fetched: false, error: null, message: null}}
        case CREATE_MESSAGE_FULFILLED:
            return {
                ...state,
                messageActive: {pending: false, fetched: true, error: null, message: action.payload.data},
                candidacyMessageList: {
                    ...state.candidacyMessageList,
                    candidacyMessages: state.candidacyMessageList.candidacyMessages.concat(action.payload.data)
                },
            }
        case CREATE_MESSAGE_REJECTED:
            return {...state, messageActive: {pending: false, fetched: false, error: action.payload.response, message: null}}

        // RETRIEVE COUNTER
        case RETRIEVE_COUNTER_MESSAGE_PENDING:
            return {...state, messageCounter: {pending: true, fetched: false, error: null, unreadCount: 0}}
        case RETRIEVE_COUNTER_MESSAGE_FULFILLED:
            return {...state, messageCounter: {pending: false, fetched: true, error: null, unreadCount: action.payload.data.unread_count}}
        case RETRIEVE_COUNTER_MESSAGE_REJECTED:
            return {...state, messageCounter: {pending: false, fetched: false, error: action.payload.response, unreadCount: 0}}

        // LIST NOTIFICATION MESSAGES
        case LIST_NOTIFICATION_MESSAGE_PENDING:
            return {
                ...state,
                notificationMessageList: {
                    ...state.notificationMessages,
                    pending: true,
                    fetched: false,
                    error: null,
                    notificationMessages: []
                }
            }
        case LIST_NOTIFICATION_MESSAGE_FULFILLED:
            return {
                ...state,
                notificationMessageList: {
                    pending: false,
                    fetched: true,
                    error: null,
                    notificationMessages: action.payload.data.results,
                    pagination: {...action.payload.data, results: undefined}
                }
            }
        case LIST_NOTIFICATION_MESSAGE_REJECTED:
            return {
                ...state,
                notificationMessageList: {
                    pending: false,
                    fetched: false,
                    error: action.payload.response,
                    notificationMessages: [],
                    pagination: null
                }
            }

        // MARK AS READ
        case MARK_AS_READ_MESSAGE:
            const isUnread = state.notificationMessageList.notificationMessages.find((message) => {
                return message.id === action.messageId && !message.is_read.is_read
            })

            return {
                ...state,
                notificationMessageList: {
                    ...state.notificationMessageList,
                    notificationMessages: state.notificationMessageList.notificationMessages.map((message) => {
                        if (message.id === action.messageId) {
                            return {...message, is_read: {...message.is_read, is_read: true}}
                        }
                        return {...message}
                    })
                },
                messageCounter: {
                    ...state.messageCounter,
                    unreadCount: (isUnread ? state.messageCounter.unreadCount - 1 : state.messageCounter.unreadCount)
                },
            }

        // DEFAULT
        default:
            return state
    }
}
