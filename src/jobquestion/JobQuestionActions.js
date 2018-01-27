import request from '../utils/request'

import { LIST_JOB_QUESTION, UPDATE_JOB_QUESTION } from './JobQuestionConstants'

export const listJobQuestion = (jobId) => {
    let args = {params: {job: jobId}}

    return {
        type: LIST_JOB_QUESTION,
        payload: request.get('/jobquestions/', args)
    }
}

export const updateJobQuestion = (id, values) => {
    return {
        type: UPDATE_JOB_QUESTION,
        payload: request.patch('/jobquestions/' + id + '/', values)
    }
}
