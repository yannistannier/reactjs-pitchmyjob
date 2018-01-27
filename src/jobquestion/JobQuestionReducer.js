import { LIST_JOB_QUESTION_PENDING, LIST_JOB_QUESTION_FULFILLED, LIST_JOB_QUESTION_REJECTED,
         UPDATE_JOB_QUESTION_PENDING, UPDATE_JOB_QUESTION_FULFILLED, UPDATE_JOB_QUESTION_REJECTED
} from './JobQuestionConstants'

const INITIAL_STATE = {
    questionList: {pending: false, fulfilled: false, error: null, questions: []},
    questionActive: {pending: false, fulfilled: false, error: null, question: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_JOB_QUESTION_PENDING:
            return {...state, questionList: {pending: true, fulfilled: false, error: null, questionss: []}}
        case LIST_JOB_QUESTION_FULFILLED:
            return {...state, questionList: {pending: false, fulfilled: true, error: null, questionss: action.payload.data.results, pagination: {...action.payload.data, results: undefined}}}
        case LIST_JOB_QUESTION_REJECTED:
            return {...state, questionList: {pending: false, fulfilled: false, error: action.payload.response, questionss: [], pagination: null}}

        // UPDATE
        case UPDATE_JOB_QUESTION_PENDING:
            return {...state, questionActive: {pending: true, fulfilled: false, error: null, question: null}}
        case UPDATE_JOB_QUESTION_FULFILLED:
            return {...state, questionActive: {pending: false, fulfilled: true, error: null, question: action.payload.data}}
        case UPDATE_JOB_QUESTION_REJECTED:
            return {...state, questionActive: {pending: false, fulfilled: false, error: action.payload.response, question: null}}

        // DEFAULT
        default:
            return state
    }
}
