import request from '../utils/request'

import { LIST_STUDY_LEVEL } from './StudyLevelConstants'

export const listStudyLevel = () => {
    return {
        type: LIST_STUDY_LEVEL,
        payload: request.get('/studylevels/')
    }
}
