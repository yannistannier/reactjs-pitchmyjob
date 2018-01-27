import { LIST_RESUME_PENDING, LIST_RESUME_FULFILLED, LIST_RESUME_REJECTED,
         RETRIEVE_RESUME_PENDING, RETRIEVE_RESUME_FULFILLED, RETRIEVE_RESUME_REJECTED,
         EXISTS_CANDIDACY_RESUME_PENDING, EXISTS_CANDIDACY_RESUME_FULFILLED, EXISTS_CANDIDACY_RESUME_REJECTED
} from './ResumeConstants'

import { UPDATE_STATUS_CANDIDACY_FULFILLED } from '../candidacy/CandidacyConstants'

const INITIAL_STATE = {
    resumeList: {pending: false, fetched: false, error: null, resumes: [], pagination: null},
    resumeActive: {pending: false, fetched: false, error: null, resume: null},
    existsCandidacy: {pending: false, fetched: false, error: null, candidacy: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_RESUME_PENDING:
            return {...state, resumeList: {...state.resumeList, pending: true, fetched: false, error: null, resumes: []}}
        case LIST_RESUME_FULFILLED:
            return {...state, resumeList: {pending: false, fetched: true, error: null, resumes: action.payload.data.results, pagination: {...action.payload.data, results: undefined}}}
        case LIST_RESUME_REJECTED:
            return {...state, resumeList: {pending: false, fetched: false, error: action.payload.response, resumes: [], pagination: null}}

        // RETRIEVE
        case RETRIEVE_RESUME_PENDING:
            return {...state, resumeActive: {pending: true, fetched: false, error: null, resume: null}}
        case RETRIEVE_RESUME_FULFILLED:
            return {...state, resumeActive: {pending: false, fetched: true, error: null, resume: action.payload.data}}
        case RETRIEVE_RESUME_REJECTED:
            return {...state, resumeActive: {pending: false, fetched: false, error: action.payload.response, resume: null}}

        // EXISTS CANDIDACY
        case EXISTS_CANDIDACY_RESUME_PENDING:
            return {...state, existsCandidacy: {pending: true, fetched: false, error: null, candidacy: null}}
        case EXISTS_CANDIDACY_RESUME_FULFILLED:
            return {...state, existsCandidacy: {pending: false, fetched: true, error: null, candidacy: action.payload.data}}
        case EXISTS_CANDIDACY_RESUME_REJECTED:
            return {...state, existsCandidacy: {pending: false, fetched: false, error: action.payload.response, candidacy: null}}

        // UPDATE STATUS
        case UPDATE_STATUS_CANDIDACY_FULFILLED:
            if (action.meta.action === 'request') {
                return {...state, existsCandidacy: {pending: false, fetched: true, error: null, candidacy: action.payload.data}}
            }

        // DEFAULT
        default:
            return state
    }
}
