import request from '../utils/request'

import { LIST_EXPERIENCE } from './ExperienceConstants'

export const listExperience = () => {
    return {
        type: LIST_EXPERIENCE,
        payload: request.get('/experiences/')
    }
}
