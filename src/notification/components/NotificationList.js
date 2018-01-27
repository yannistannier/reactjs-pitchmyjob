import React from 'react'

export default class NotificationList extends React.Component {
    componentDidMount() {
        this.props.listNotification()
    }

    render() {
        const { toggleNotification, redirectToActionObject } = this.props
        const { isVisible, unreadCount, fetching, error, notifications } = this.props.notification


        if (error) {
            return (
                <p>Error list</p>
            )
        }
        else if (fetching) {
            return (
                <p>Chargement...</p>
            )
        }

        const notificationList = notifications.map((notification) => {
            return (
                <li key={notification.id} onClick={() => redirectToActionObject(notification)}>
                    {notification.emmiter.first_name} {notification.emmiter.last_name} {notification.type_name} {notification.is_unread ? 'Oui' : 'Non'}
                </li>
            )
        })

        return (
            <div>
                <button onClick={() => toggleNotification()}>Afficher les notifications ({unreadCount})</button>
                {isVisible && <ul>{notificationList}</ul>}
            </div>
        )
    }
}
