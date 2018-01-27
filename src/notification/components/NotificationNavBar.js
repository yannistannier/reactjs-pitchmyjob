import React from 'react'
import { Link } from 'react-router'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import { getNotificationURL, getNotificationMessage } from '../../notification/utils'
import { toLocaleString } from '../../utils/date'

export default class NotificationNavBar extends React.Component {
    render() {
        const { notifications, counter, onMarkAsRead } = this.props

        let notificationResult = null
        if (notifications.error) {
            notificationResult = (
                <a href="#" className="list-group-item dropdown-item" role="menuitem">
                    <div className="media">
                        <LoadingError />
                    </div>
                </a>
            )
        }
        else if (notifications.fetched) {
            if (notifications.notifications.length > 0) {
                notificationResult = notifications.notifications.map((notification) => {
                    let className = 'list-group-item dropdown-item' + (notification.is_unread ? ' list-group-item-unread' : '')
                    return (
                        <Link key={notification.id} to={getNotificationURL(notification)} className={className} role="menuitem" onClick={() => onMarkAsRead(notification.id)}>
                            <div className="media">
                                <div className="media-left">
                                    <div className="avatar">
                                        <img src={notification.emmiter.photo} alt="" />
                                    </div>
                                </div>
                                <div className="media-body">
                                    <h6 className="media-heading" style={{whiteSpace: 'initial'}}>{getNotificationMessage(notification)}</h6>
                                    <time className="media-meta">{toLocaleString(notification.created)}</time>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            else {
                notificationResult = (
                    <a href="#" className="list-group-item dropdown-item" role="menuitem">
                        <div className="media">
                            Aucune activité récente
                        </div>
                    </a>
                )
            }
        }
        else {
            notificationResult = (
                <a href="#" className="list-group-item dropdown-item" role="menuitem">
                    <div className="media">
                        <Loader />
                    </div>
                </a>
            )
        }

        return (
            <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#" title="Notifications" aria-expanded="false" data-animation="scale-up" role="button">
                    <i className="icon wb-bell" aria-hidden="true"></i>
                    {counter.fetched && counter.unreadCount > 0 &&
                        <span className="tag tag-pill tag-danger up">{counter.unreadCount}</span>
                    }
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-media" role="menu">
                    <div className="dropdown-menu-header">
                        <h5>NOTIFICATIONS</h5>
                        {counter.fetched && counter.unreadCount > 0 &&
                            <span className="tag tag-round tag-danger">{counter.unreadCount}</span>
                        }
                    </div>
                    <div className="list-group">
                        <div data-role="container">
                            <div data-role="content">{notificationResult}</div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
