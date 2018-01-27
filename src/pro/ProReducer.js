import { RETRIEVE_PRO_PENDING, RETRIEVE_PRO_FULFILLED, RETRIEVE_PRO_REJECTED,
         CREATE_PRO_FULFILLED,
         UPDATE_PRO_FULFILLED,
} from './ProConstants'

const INITIAL_STATE = {
    fetching: false,
    fetched: false,
    created: false,
    error: null,
    pro: null,
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // RETRIEVE
        case RETRIEVE_PRO_PENDING:
            return {...state, fetching: true}
        case RETRIEVE_PRO_FULFILLED:
            return {...state, fetching: false, fetched: true, pro: action.payload.data}
        case RETRIEVE_PRO_REJECTED:
            return {...state, fetching: false, error: action.payload.response}

        // CREATE
        case CREATE_PRO_FULFILLED:
            return {...state, created: true, pro: action.payload.data}

        // UPDATE
        case UPDATE_PRO_FULFILLED:
            return {...state, pro: action.payload.data}

        // DEFAULT
        default:
            return state
    }
}
