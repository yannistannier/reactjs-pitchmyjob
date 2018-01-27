import request from '../utils/request'

import { LIST_COLLABORATOR, CREATE_COLLABORATOR, DESTROY_COLLABORATOR } from './CollaboratorConstants'

export const listCollaborator = () => {
    return {
        type: LIST_COLLABORATOR,
        payload: request.get('/pro/collaborators/')
    }
}

export const createCollaborator = (values) => {
    return {
        type: CREATE_COLLABORATOR,
        payload: request.post('/pro/collaborators/', values)
    }
}

export const destroyCollaborator = (id) => {
    return {
        type: DESTROY_COLLABORATOR,
        payload: request.delete('/pro/collaborators/' + id + '/'),
        meta: {
            id: id,
        },
    }
}
