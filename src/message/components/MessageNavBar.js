import React from 'react'
import { Link } from 'react-router'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import { toLocaleString } from '../../utils/date'

export default class MessageNavBar extends React.Component {
    render() {
        const { onMarkAsRead } = this.props
        const { counter, messages } = this.props

        let messagesResult = null
        if (messages.error) {
            messagesResult = (
                <a className="list-group-item" href="#" role="menuitem">
                    <div className="media">
                        <LoadingError />
                    </div>
                </a>
            )
        }
        else if (messages.fetched) {
            if (messages.notificationMessages.length > 0) {
                messagesResult = messages.notificationMessages.map((message) => {
                    let className = 'list-group-item dropdown-item' + (!message.is_read.is_read ? ' list-group-item-unread' : '')

                    return (
                        <Link key={message.id} to={'/messages/' + message.job + '/1/candidacy/' + message.candidacy + '/'} className={className} role="menuitem" onClick={() => onMarkAsRead(message.id)}>
                            <div className="media">
                                <div className="media-left p-r-10">
                                    <span className="avatar avatar-sm avatar-online">
                                        <img src={message.emmiter.photo} alt="..." />
                                        <i></i>
                                    </span>
                                </div>
                                <div className="media-body">
                                    <h6 className="media-heading">{message.emmiter.first_name} {message.emmiter.last_name}</h6>
                                    <div className="media-meta">
                                        <time>{toLocaleString(message.created)}</time>
                                    </div>
                                    <div className="media-detail">{message.message}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            else {
                messagesResult = (
                    <a className="list-group-item" href="#" role="menuitem">
                        <div className="media">
                            Aucune activité récente
                        </div>
                    </a>
                )
            }
        }
        else {
            messagesResult = (
                <a className="list-group-item" href="#" role="menuitem">
                    <div className="media">
                        <Loader />
                    </div>
                </a>
            )
        }

        return (
            <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#" title="Messages" aria-expanded="false" data-animation="scale-up" role="button">
                    <i className="icon wb-envelope" aria-hidden="true"></i>
                    {counter.fetched && counter.unreadCount > 0 &&
                        <span className="tag tag-pill tag-info up">{counter.unreadCount}</span>
                    }
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-media" role="menu">
                    <div className="dropdown-menu-header" role="presentation">
                        <h5>MESSAGES</h5>
                        {counter.fetched && counter.unreadCount > 0 &&
                            <span className="tag tag-round tag-info">{counter.unreadCount}</span>
                        }
                    </div>
                    <div className="list-group" role="presentation">
                        <div data-role="container">
                            <div data-role="content">{messagesResult}</div>
                        </div>
                    </div>
                    <div className="dropdown-menu-footer" role="presentation">
                        <Link to="/messages/" className="dropdown-item" role="menuitem">
                            Voir tous les messages
                        </Link>
                    </div>
                </div>
            </li>
        )
    }
}



