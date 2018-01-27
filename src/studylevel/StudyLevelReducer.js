import { LIST_STUDY_LEVEL_PENDING, LIST_STUDY_LEVEL_FULFILLED, LIST_STUDY_LEVEL_REJECTED } from './StudyLevelConstants'

const INITIAL_STATE = {
    fetching: false,
    fetched: false,
    error: null,
    studyLevels: [],
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_STUDY_LEVEL_PENDING:
            return {...state, fetching: true}
        case LIST_STUDY_LEVEL_FULFILLED:
            return {...state, fetching: false, fetched: true, studyLevels: action.payload.data}
        case LIST_STUDY_LEVEL_REJECTED:
            return {...state, fetching: false, error: action.payload.response}
        default:
            return state
    }
}
