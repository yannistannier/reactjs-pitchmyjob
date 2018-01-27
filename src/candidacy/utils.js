export const convertStatusParamsToAPI = (status) => {
    if (status === 'liked') {
        return 'L'
    }
    else if (status === 'pending') {
        return 'R'
    }
    else if (status === 'to-validate') {
        return 'V'
    }
    else if (status === 'accepted') {
        return 'S'
    }
    else if (status === 'rejected') {
        return 'N'
    }
}

export const convertStatusAPIToParams = (status) => {
    if (status === 'L') {
        return 'liked'
    }
    else if (status === 'R') {
        return 'pending'
    }
    else if (status === 'V') {
        return 'to-validate'
    }
    else if (status === 'S') {
        return 'accepted'
    }
    else if (status === 'N') {
        return 'rejected'
    }
}

export const getCandidacyTagClass = (status) => {
    if (status === 'L') {
        return 'default'
    }
    else if (status === 'R') {
        return 'warning'
    }
    else if (status === 'V') {
        return 'primary'
    }
    else if (status === 'S') {
        return 'success'
    }
    else if (status === 'N') {
        return 'danger'
    }
}

export const getCandidacyStateLabel = (status) => {
    if (status === 'L') {
        return 'Aimé'
    }
    else if (status === 'R') {
        return 'En attente'
    }
    else if (status === 'V') {
        return 'Vidéo'
    }
    else if (status === 'S') {
        return 'Retenu'
    }
    else if (status === 'N') {
        return 'Non retenu'
    }
}
