import React from 'react'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import { getNotificationMessage } from '../../notification/utils'
import { toLocaleString } from '../../utils/date'

export default class NotificationCard extends React.Component {
    render() {
        const { notifications } = this.props

        let notificationResult = null
        if (notifications.error) {
            notificationResult = (
                <li className="list-group-item">
                    <LoadingError />
                </li>
            )
        }
        else if (notifications.fetched) {
            if (notifications.notifications.length > 0) {
                notificationResult = notifications.notifications.map((notification) => {
                    return (
                        <li key={notification.id} className="list-group-item">
                            <div className="media">
                                <div className="media-left">
                                    <a className="avatar" href="#">
                                        <img src={notification.emmiter.photo} alt="" />
                                    </a>
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">
                                        {getNotificationMessage(notification)}
                                    </h4>
                                    <small>{toLocaleString(notification.created)}</small>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            else {
                notificationResult = (
                    <li className="list-group-item">
                        Aucune activité récente
                    </li>
                )
            }
        }
        else {
            notificationResult = (
                <li className="list-group-item">
                    <Loader />
                </li>
            )
        }

        return (
            <div className="panel" id="daily-feed">
                <div className="panel-heading">
                    <h3 className="panel-title">Activités</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group list-group-dividered list-group-full">
                        {notificationResult}
                    </ul>
                </div>
            </div>
        )
    }
}
