import request from '../utils/request'

import { LIST_INDUSTRY } from './IndustryConstants'

export const listIndustry = () => {
    return {
        type: LIST_INDUSTRY,
        payload: request.get('/industries/')
    }
}
