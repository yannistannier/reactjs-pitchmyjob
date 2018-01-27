import { LIST_CONTRACT_TYPE_PENDING, LIST_CONTRACT_TYPE_FULFILLED, LIST_CONTRACT_TYPE_REJECTED } from './ContractTypeConstants'

const INITIAL_STATE = {
    fetching: false,
    fetched: false,
    error: null,
    contractTypes: [],
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_CONTRACT_TYPE_PENDING:
            return {...state, fetching: true}
        case LIST_CONTRACT_TYPE_FULFILLED:
            return {...state, fetching: false, fetched: true, contractTypes: action.payload.data}
        case LIST_CONTRACT_TYPE_REJECTED:
            return {...state, fetching: false, error: action.payload.response}
        default:
            return state
    }
}
