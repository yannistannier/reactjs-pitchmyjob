import { LIST_JOB_PENDING, LIST_JOB_FULFILLED, LIST_JOB_REJECTED,
         RETRIEVE_JOB_PENDING, RETRIEVE_JOB_FULFILLED, RETRIEVE_JOB_REJECTED,
         RETRIEVE_COUNTER_JOB_PENDING, RETRIEVE_COUNTER_JOB_FULFILLED, RETRIEVE_COUNTER_JOB_REJECTED,
         CREATE_JOB_PENDING, CREATE_JOB_FULFILLED, CREATE_JOB_REJECTED,
         UPDATE_JOB_PENDING, UPDATE_JOB_FULFILLED, UPDATE_JOB_REJECTED,
         DESTROY_JOB_PENDING, DESTROY_JOB_FULFILLED, DESTROY_JOB_REJECTED,
         PUBLISH_JOB_PENDING, PUBLISH_JOB_FULFILLED, PUBLISH_JOB_REJECTED,
         LIST_INVITATION_EMAIL, LIST_INVITATION_EMAIL_PENDING, LIST_INVITATION_EMAIL_FULFILLED, LIST_INVITATION_EMAIL_REJECTED,
         CREATE_INVITATION_EMAIL, CREATE_INVITATION_EMAIL_PENDING, CREATE_INVITATION_EMAIL_FULFILLED, CREATE_INVITATION_EMAIL_REJECTED
} from './JobConstants'

const INITIAL_STATE = {
    jobList: {pending: false, fetched: false, error: null, jobs: [], pagination: null},
    jobActive: {pending: false, fetched: false, error: null, job: null},
    jobCounter: {pending: false, fetched: false, error: null, results: {pending: null, visible: null, expired: null} },
    invitationEmailList:{pending: false, fetched: false, error: null, emails: []}
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_JOB_PENDING:
            return {...state, jobList: {...state.jobList, pending: true, fetched: false, error: null, jobs: []}}
        case LIST_JOB_FULFILLED:
            return {...state, jobList: {pending: false, fetched: true, error: null, jobs: action.payload.data.results, pagination: {...action.payload.data, results: undefined}}}
        case LIST_JOB_REJECTED:
            return {...state, jobList: {pending: false, fetched: false, error: action.payload.response, jobs: [], pagination: null}}

        // RETRIEVE
        case RETRIEVE_JOB_PENDING:
            return {...state, jobActive: {pending: true, fetched: false, error: null, job: null}}
        case RETRIEVE_JOB_FULFILLED:
            return {...state, jobActive: {pending: false, fetched: true, error: null, job: action.payload.data}}
        case RETRIEVE_JOB_REJECTED:
            return {...state, jobActive: {pending: false, fetched: false, error: action.payload.response, job: null}}

        // CREATE
        case CREATE_JOB_PENDING:
            return {...state, jobActive: {pending: true, fetched: false, error: null, job: null}}
        case CREATE_JOB_FULFILLED:
            return {...state, jobActive: {pending: false, fetched: true, error: null, job: action.payload.data}}
        case CREATE_JOB_REJECTED:
            return {...state, jobActive: {pending: false, fetched: false, error: action.payload.response, job: null}}

        // UPDATE
        case UPDATE_JOB_PENDING:
            return {...state, jobActive: {pending: true, fetched: false, error: null, job: null}}
        case UPDATE_JOB_FULFILLED:
            return {...state, jobActive: {pending: false, fetched: true, error: null, job: action.payload.data}}
        case UPDATE_JOB_REJECTED:
            return {...state, jobActive: {pending: false, fetched: false, error: action.payload.response, job: null}}

        // DESTROY
        case DESTROY_JOB_PENDING:
            return {...state, jobActive: {pending: true, fetched: false, error: null, job: state.jobList.jobs.find((job) => { return job.id === action.meta.id })}}
        case DESTROY_JOB_FULFILLED:
            return {...state, jobActive: {pending: false, fetched: true, error: null, job: null}, jobList: {...state.jobList, jobs: state.jobList.jobs.filter((job) => { return job.id !== action.meta.id })}}
        case DESTROY_JOB_REJECTED:
            return {...state, jobActive: {pending: false, fetched: false, error: action.payload.response, job: null}}

        // RETRIEVE COUNTER
        case RETRIEVE_COUNTER_JOB_PENDING:
            return {...state, jobCounter: {pending: true, fetched: false, error: null, results: {pending: null, visible: null, expired: null}}}
        case RETRIEVE_COUNTER_JOB_FULFILLED:
            return {...state, jobCounter: {pending: false, fetched: true, error: null, results: action.payload.data}}
        case RETRIEVE_COUNTER_JOB_REJECTED:
            return {...state, jobCounter: {pending: false, fetched: false, error: action.payload.response, results: {pending: null, visible: null, expired: null}}}

        // PUBLISH
        case PUBLISH_JOB_PENDING:
            return {...state, jobActive: {pending: true, fetched: false, error: null, job: null}}
        case PUBLISH_JOB_FULFILLED:
            return {...state, jobActive: {pending: false, fetched: true, error: null, job: action.payload.data}}
        case PUBLISH_JOB_REJECTED:
            return {...state, jobActive: {pending: false, fetched: false, error: action.payload.response, job: null}}

        // EMAIL
        case LIST_INVITATION_EMAIL_PENDING:
            return {...state, invitationEmailList: {...state.invitationEmailList, pending: true, fetched: false, error: null, emails: []}}
        case LIST_INVITATION_EMAIL_FULFILLED:
            return {...state, invitationEmailList: {pending: false, fetched: true, error: null, emails: action.payload.data}}
        case LIST_INVITATION_EMAIL_REJECTED:
            return {...state, invitationEmailList: {pending: false, fetched: false, error: action.payload.response, emails: []}}

        // EMAIL
        case CREATE_INVITATION_EMAIL_PENDING:
            return {...state, invitationEmailList: {...state.invitationEmailList, pending: true, fetched: false, error: null, emails: []}}
        case CREATE_INVITATION_EMAIL_FULFILLED:
            return {...state, invitationEmailList: {pending: false, fetched: true, error: null, emails: action.payload.data}}
        case CREATE_INVITATION_EMAIL_REJECTED:
            return {...state, invitationEmailList: {pending: false, fetched: false, error: action.payload.response, emails: []}}

        // DEFAULT
        default:
            return state
    }
}
