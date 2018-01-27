import { LIST_CANDIDACY_PENDING, LIST_CANDIDACY_FULFILLED, LIST_CANDIDACY_REJECTED,
         RETRIEVE_COUNTER_CANDIDACY_PENDING, RETRIEVE_COUNTER_CANDIDACY_FULFILLED, RETRIEVE_COUNTER_CANDIDACY_REJECTED,
         RETRIEVE_CANDIDACY_PENDING, RETRIEVE_CANDIDACY_FULFILLED, RETRIEVE_CANDIDACY_REJECTED,
         LIST_COMMENTS_CANDIDACY_PENDING, LIST_COMMENTS_CANDIDACY_FULFILLED, LIST_COMMENTS_CANDIDACY_REJECTED,
         NEXT_COMMENTS_CANDIDACY_PENDING, NEXT_COMMENTS_CANDIDACY_FULFILLED, NEXT_COMMENTS_CANDIDACY_REJECTED,
         CREATE_COMMENT_CANDIDACY_PENDING, CREATE_COMMENT_CANDIDACY_FULFILLED, CREATE_COMMENT_CANDIDACY_REJECTED,
         UPDATE_STATUS_CANDIDACY_PENDING, UPDATE_STATUS_CANDIDACY_FULFILLED, UPDATE_STATUS_CANDIDACY_REJECTED
} from './CandidacyConstants'

const INITIAL_STATE = {
    candidacyList: {pending: false, fetched: false, error: null, candidacies: [], pagination: null},
    candidacyActive: {pending: false, fetched: false, error: null, candidacy: null},
    candidacyStateUpdate: {pending: false, fetched: false, error: null, candidacyId: null},
    candidacyCounter: {pending: false, fetched: false, error: null, results: {not_selected: null, like: null, request: null, video: null, selected: null} },
    commentsCandidacyList: {pending: false, fetched: false, nextPending: false, nextFetched: false, error: null, comments: [], pagination: null},
    commentCandidacyActive: {pending: false, fetched: false, error: null, comment: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_CANDIDACY_PENDING:
            return {...state, candidacyList: {...state.candidacyList, pending: true, fetched: false, error: null, candidacies: []}}
        case LIST_CANDIDACY_FULFILLED:
            return {...state, candidacyList: {pending: false, fetched: true, error: null, candidacies: action.payload.data.results, pagination: {...action.payload.data, results: undefined}}}
        case LIST_CANDIDACY_REJECTED:
            return {...state, candidacyList: {pending: false, fetched: false, error: action.payload.response, candidacies: [], pagination: null}}

        // RETRIEVE COUNTER
        case RETRIEVE_COUNTER_CANDIDACY_PENDING:
            return {...state, candidacyCounter: {pending: true, fetched: false, error: null, results: {not_selected: null, like: null, request: null, video: null, selected: null}}}
        case RETRIEVE_COUNTER_CANDIDACY_FULFILLED:
            return {...state, candidacyCounter: {pending: false, fetched: true, error: null, results: action.payload.data}}
        case RETRIEVE_COUNTER_CANDIDACY_REJECTED:
            return {...state, candidacyCounter: {pending: false, fetched: false, error: action.payload.response, results: {not_selected: null, like: null, request: null, video: null, selected: null}}}

        // RETRIEVE
        case RETRIEVE_CANDIDACY_PENDING:
            return {...state, candidacyActive: {pending: true, fetched: false, error: null, candidacy: null}}
        case RETRIEVE_CANDIDACY_FULFILLED:
            return {...state, candidacyActive: {pending: false, fetched: true, error: null, candidacy: action.payload.data}}
        case RETRIEVE_CANDIDACY_REJECTED:
            return {...state, candidacyActive: {pending: false, fetched: false, error: action.payload.response, candidacy: null}}

        // COMMENTS LIST
        case LIST_COMMENTS_CANDIDACY_PENDING:
            return {...state, commentsCandidacyList: {...state.commentsCandidacyList, pending: true, fetched: false, error: null, comments: []}}
        case LIST_COMMENTS_CANDIDACY_FULFILLED:
            return {
                ...state,
                commentsCandidacyList: {
                    ...state.commentsCandidacyList,
                    pending: false,
                    fetched: true,
                    error: null,
                    comments: action.payload.data.results.reverse(),
                    pagination: {...action.payload.data, results: undefined}
                }
            }
        case LIST_COMMENTS_CANDIDACY_REJECTED:
            return {...state, commentsCandidacyList: {...state.commentsCandidacyList, pending: false, fetched: false, error: action.payload.response, comments: [], pagination: null}}

        // COMMENTS NEXT
        case NEXT_COMMENTS_CANDIDACY_PENDING:
            return {...state, commentsCandidacyList: {...state.commentsCandidacyList, nextPending: true, nextFetched: false, error: null}}
        case NEXT_COMMENTS_CANDIDACY_FULFILLED:
            return {
                ...state,
                commentsCandidacyList: {
                    ...state.commentsCandidacyList,
                    nextPending: false,
                    nextFetched: true,
                    error: null,
                    comments: action.payload.data.results.reverse().concat(state.commentsCandidacyList.comments),
                    pagination: {...action.payload.data, results: undefined}
                }
            }
        case NEXT_COMMENTS_CANDIDACY_REJECTED:
            return {...state, commentsCandidacyList: {...state.commentsCandidacyList, nextPending: false, nextFetched: false, error: action.payload.response, comments: [], pagination: null}}

        // COMMENTS CREATE
        case CREATE_COMMENT_CANDIDACY_PENDING:
            return {...state, commentCandidacyActive: {pending: true, fetched: false, error: null, comment: null}}
        case CREATE_COMMENT_CANDIDACY_FULFILLED:
            return {
                ...state,
                commentCandidacyActive: {pending: false, fetched: true, error: null, comment: action.payload.data},
                commentsCandidacyList: {...state.commentsCandidacyList, comments: state.commentsCandidacyList.comments.concat(action.payload.data)},
            }
        case CREATE_COMMENT_CANDIDACY_REJECTED:
            return {...state, commentCandidacyActive: {pending: false, fetched: false, error: action.payload.response, comment: null}}

        // UPDATE STATUS
        case UPDATE_STATUS_CANDIDACY_PENDING:
            return {...state, candidacyStateUpdate: {pending: true, fetched: false, error: null, candidacyId: action.meta.id}}
        case UPDATE_STATUS_CANDIDACY_FULFILLED:
            // Changes candidacy status if UPDATE STATUS has been called on panel
            let candidacy = {...state.candidacyActive.candidacy}
            if (candidacy) {
                candidacy['status'] = action.payload.data.status
            }

            return {
                ...state,
                candidacyStateUpdate: {pending: false, fetched: true, error: null, candidacyId: null},
                candidacyList: {...state.candidacyList, candidacies: state.candidacyList.candidacies.filter((candidacy) => { return candidacy.id !== action.meta.id })},
                candidacyActive: {...state.candidacyActive, candidacy: candidacy},
            }
        case UPDATE_STATUS_CANDIDACY_REJECTED:
            return {...state, candidacyStateUpdate: {pending: false, fetched: false, error: action.payload.response, candidacyId: null}}

        // DEFAULT
        default:
            return state
    }
}
