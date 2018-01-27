import React from 'react'
import { Link } from 'react-router'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'

export default class CollaboratorCard extends React.Component {
    render() {
        const { onDelete, collaborators, currentUser } = this.props

        let collaboratorResult = null
        if (collaborators.error) {
            collaboratorResult = <LoadingError />
        }
        else if (collaborators.fetched) {
            collaboratorResult = collaborators.collaborators.map((collaborator) => {
                let deleted = (collaborators.deleted === collaborator)
                return (
                    <li className="list-group-item" key={collaborator.id}>
                        <div className="media">
                            <div className="media-left">
                                <a className="avatar avatar-online" href="#">
                                    <img src={collaborator.photo} alt=""/>
                                </a>
                            </div>
                            <div className="media-body">
                                <div className="pull-right">
                                    {deleted &&
                                        <span className="loader loader-circle"></span>
                                    }
                                    {!deleted && currentUser.id !== collaborator.id &&
                                        <button type="button" className="btn btn-icon btn-danger btn-round btn-outline" onClick={() => onDelete(collaborator.id)}>
                                            <i className="icon wb-close-mini" aria-hidden="true"></i>
                                        </button>
                                    }
                                </div>
                                <div style={{lineHeight: '40px'}}>
                                    {collaborator.first_name} {collaborator.last_name}
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
        }
        else {
            collaboratorResult = <Loader />
        }

        return (
            <div className="panel" id="followers">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Collaborateurs
                    </h3>
                </div>
                <div className="panel-body">
                    {collaboratorResult}
                    {collaborators.fetched &&
                        <Link to="/collaborators/create/">
                            <button type="button" className="btn btn-block btn-primary">Ajouter</button>
                        </Link>
                    }
                </div>
            </div>
        )
    }
}
