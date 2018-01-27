import { LIST_EMPLOYEE_PENDING, LIST_EMPLOYEE_FULFILLED, LIST_EMPLOYEE_REJECTED } from './EmployeeConstants'

const INITIAL_STATE = {
    fetching: false,
    fetched: false,
    error: null,
    employees: [],
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_EMPLOYEE_PENDING:
            return {...state, fetching: true}
        case LIST_EMPLOYEE_FULFILLED:
            return {...state, fetching: false, fetched: true, employees: action.payload.data}
        case LIST_EMPLOYEE_REJECTED:
            return {...state, fetching: false, error: action.payload.response}
        default:
            return state
    }
}
