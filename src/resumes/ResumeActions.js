import request from '../utils/request'

import { LIST_RESUME, RETRIEVE_RESUME, EXISTS_CANDIDACY_RESUME } from './ResumeConstants'

export const listResume = (jobId, page = null, search = null) => {
    let values = {job: jobId}
    if (page) {
        values['page'] = page
    }
    if (search) {
        values['search'] = search
    }

    return {
        type: LIST_RESUME,
        payload: request.post('/jobs/matching/', values)
    }
}

export const retrieveResume = (applicantId) => {
    return {
        type: RETRIEVE_RESUME,
        payload: request.get('/applicant/resume/' + applicantId + '/')
    }
}

export const existsCandidacyResume = (jobId, applicantId) => {
    const values = {
        job: jobId,
        applicant: applicantId,
    }

    return {
        type: EXISTS_CANDIDACY_RESUME,
        payload: request.post('/pro/candidacy/exists/', values)
    }
}
