import React from 'react'
import { Link } from 'react-router'

export const getTagClass = (code) => {
    switch (code) {
        case 'P':
            return 'primary'
        case 'V':
            return 'success'
        case 'E':
            return 'warning'
        default:
            return 'default'
    }
}

export const getButtonAction = (code, id) => {
    switch (code) {
        case 'P':
            return (
                <Link to={'/jobs/' + id + '/publish/'} className="btn btn-block btn-primary">Publier</Link>
            )
        case 'V':
            return (
                <Link to={'/jobs/1/invitation/' + id + '/' } data-toggle="slidePanel" className="btn btn-block btn-success">Inviter par e-mail</Link>
            )
        case 'E':
            return (
                <Link to={'/jobs/' + id + '/publish/'} className="btn btn-block btn-warning">Republier</Link>
            )
        default:
            return
    }
}
