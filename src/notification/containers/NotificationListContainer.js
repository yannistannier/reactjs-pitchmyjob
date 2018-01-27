import { connect } from 'react-redux'

import NotificationList from '../components/NotificationList'
import { listNotification, toggleNotification } from '../NotificationActions'

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listNotification: () => {
            return dispatch(listNotification())
        },
        toggleNotification: () => {
            return dispatch(toggleNotification())
        },
        redirectToActionObject: (notification) => {
            // TODO: write the code to redirect user to the action object
            return false
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)
