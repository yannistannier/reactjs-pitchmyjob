import { LIST_EXPERIENCE_PENDING, LIST_EXPERIENCE_FULFILLED, LIST_EXPERIENCE_REJECTED } from './ExperienceConstants'

const INITIAL_STATE = {
    fetching: false,
    fetched: false,
    error: null,
    experiences: [],
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_EXPERIENCE_PENDING:
            return {...state, fetching: true}
        case LIST_EXPERIENCE_FULFILLED:
            return {...state, fetching: false, fetched: true, experiences: action.payload.data}
        case LIST_EXPERIENCE_REJECTED:
            return {...state, fetching: false, error: action.payload.response}
        default:
            return state
    }
}
