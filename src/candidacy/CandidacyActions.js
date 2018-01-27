import request from '../utils/request'

import { LIST_CANDIDACY, RETRIEVE_COUNTER_CANDIDACY, RETRIEVE_CANDIDACY, LIST_COMMENTS_CANDIDACY,
         NEXT_COMMENTS_CANDIDACY, CREATE_COMMENT_CANDIDACY, UPDATE_STATUS_CANDIDACY
} from './CandidacyConstants'

export const listCandidacy = (jobId, status, page = null, search = null) => {
    let args = {params: {status: status}}
    if (page) {
        args['params']['page'] = page
    }
    if (search) {
        args['params']['search'] = search
    }

    return {
        type: LIST_CANDIDACY,
        payload: request.get('/pro/candidacies/' + jobId + '/', args)
    }
}

export const retrieveCounterCandidacy = (jobId) => {
    return {
        type: RETRIEVE_COUNTER_CANDIDACY,
        payload: request.get('/jobs/' + jobId + '/count-candidacies/')
    }
}

export const retrieveCandidacy = (id) => {
    return {
        type: RETRIEVE_CANDIDACY,
        payload: request.get('/pro/candidacy/' + id + '/')
    }
}

export const listCommentsCandidacy = (candidacyId) => {
    let args = {params: {candidacy: candidacyId}}

    return {
        type: LIST_COMMENTS_CANDIDACY,
        payload: request.get('/pro/candidacy/comments/', args)
    }
}

export const nextCommentsCandidacy = (candidacyId, cursor) => {
    let args = {
        params: {
            candidacy: candidacyId,
            cursor: cursor,
        }
    }

    return {
        type: NEXT_COMMENTS_CANDIDACY,
        payload: request.get('/pro/candidacy/comments/', args)
    }
}

export const createCommentCandidacy = (values) => {
    return {
        type: CREATE_COMMENT_CANDIDACY,
        payload: request.post('/pro/candidacy/comments/', values)
    }
}

export const requestCandidacy = (jobId, applicantId, candidacyId=null) => {
    const values = {job: jobId, applicant: applicantId}

    let meta = {action: 'request'}
    if (candidacyId) {
        meta['id'] = candidacyId
    }

    return {
        type: UPDATE_STATUS_CANDIDACY,
        payload: request.post('/pro/candidacy/request/', values),
        meta: meta,
    }
}

export const approveCandidacy = (id) => {
    return {
        type: UPDATE_STATUS_CANDIDACY,
        payload: request.put('/pro/candidacy/' + id + '/approve/'),
        meta: {
            id: id,
            action: 'approve',
        },
    }
}

export const disapproveCandidacy = (id) => {
    return {
        type: UPDATE_STATUS_CANDIDACY,
        payload: request.put('/pro/candidacy/' + id + '/disapprove/'),
        meta: {
            id: id,
            action: 'disapprove',
        },
    }
}
