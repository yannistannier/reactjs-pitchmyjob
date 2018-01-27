import { LIST_INDUSTRY_PENDING, LIST_INDUSTRY_FULFILLED, LIST_INDUSTRY_REJECTED } from './IndustryConstants'

const INITIAL_STATE = {
    fetching: false,
    fetched: false,
    error: null,
    industries: [],
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_INDUSTRY_PENDING:
            return {...state, fetching: true}
        case LIST_INDUSTRY_FULFILLED:
            return {...state, fetching: false, fetched: true, industries: action.payload.data}
        case LIST_INDUSTRY_REJECTED:
            return {...state, fetching: false, error: action.payload.response}
        default:
            return state
    }
}
