import React from 'react'
import { NotificationStack } from 'react-notification'

export default class Alert extends React.Component {
    render() {
        const { hideAlert } = this.props
        const { alerts } = this.props.alert

        return (
            <NotificationStack
                notifications={alerts}
                onDismiss={(alert) => hideAlert(alert.key)} />
        )
    }
}
