import { CREATE_ALERT, DESTROY_ALERT } from './AlertConstants'

const INITIAL_STATE = {
    counter: 0,
    alerts: [],
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_ALERT:
            const counter = state.counter + 1
            return {
                ...state,
                counter: counter,
                alerts: state.alerts.concat({
                    key: counter,
                    message: action.message,
                    dismissAfter: 4000,
                    className: action.className,
                    style: false,
                })
            }
        case DESTROY_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter((alert) => alert.key !== action.key)
            }

        // DEFAULT
        default:
            return state
    }
}
