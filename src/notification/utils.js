export const getNotificationURL = (notification) => {
    const { action_object } = notification
    let link = '#'

    switch (notification.type_name) {
        case 'PRO_JOB_ADDED':
        case 'PRO_JOB_UPDATED':
        case 'PRO_JOB_PUBLISHED':
            link = '/jobs/edit/' + action_object.id + '/'
            break
        default:
            link = '#'
            break
    }

    return link
}

export const getNotificationMessage = (notification) => {
    const { action_object } = notification
    let message = ''

    switch (notification.type_name) {
        case 'APPLICANT_JOB_NEW_MATCHING':
            break
        case 'APPLICANT_CANDIDACY_REQUESTED':
            break
        case 'APPLICANT_CANDIDACY_APPROVED':
            break
        case 'APPLICANT_CANDIDACY_DISAPPROVED':
            break
        case 'PRO_JOB_ADDED':
            message = 'à créé une offre ' + action_object.title
            break
        case 'PRO_JOB_UPDATED':
            message = 'à modifié une offre ' + action_object.title
            break
        case 'PRO_JOB_PUBLISHED':
            message = 'à publié une offre ' + action_object.title
            break
        case 'PRO_JOB_DELETED':
            message = 'à supprimé une offre ' + action_object.title
            break
        case 'PRO_JOB_LIKED':
            break
        case 'PRO_JOB_NEW_CANDIDACY':
            break
        case 'PRO_COLLABORATOR_ADDED':
            message = 'à ajouté le collaborateur ' + action_object.first_name + ' ' + action_object.last_name
            break
        case 'PRO_COLLABORATOR_DELETED':
            message = 'à supprimé le collaborateur ' + action_object.first_name + ' ' + action_object.last_name
            break
        case 'PRO_CANDIDACY_NEW_COMMENT':
            break
        default:
            break
    }

    return notification.emmiter.first_name + ' ' + notification.emmiter.last_name + ' ' + message
}
