import { connect } from 'react-redux'

import NavBar from '../components/NavBar'
import { listNotification, retrieveCounterNotification, marketAsReadNotification } from '../../notification/NotificationActions'
import { retrieveCounterMessage, listNotificationMessage, markAsReadMessage } from '../../message/MessageActions'

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        notificationList: state.notification.notificationList,
        notificationCounter: state.notification.notificationCounter,
        messageCounter: state.message.messageCounter,
        notificationMessageList: state.message.notificationMessageList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listNotification: () => {
            return dispatch(listNotification())
        },
        retrieveCounterNotification: () => {
            return dispatch(retrieveCounterNotification())
        },
        marketAsReadNotification: (id) => {
            return dispatch(marketAsReadNotification(id))
        },
        retrieveCounterMessage: () => {
            return dispatch(retrieveCounterMessage())
        },
        listNotificationMessage: () => {
            return dispatch(listNotificationMessage())
        },
        markAsReadMessage: (id) => {
            return dispatch(markAsReadMessage(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
