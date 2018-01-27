import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'
import { retrieveCounterJob } from '../../job/JobActions'
import { retrievePro } from '../../pro/ProActions'
import { listCollaborator, destroyCollaborator } from '../../collaborator/CollaboratorActions'
import { listNotification } from '../../notification/NotificationActions'
import { addAlertSuccess } from '../../alert/AlertActions'

const mapStateToProps = (state) => {
    return {
        pro: state.pro,
        jobCounter: state.job.jobCounter,
        collaborator: state.collaborator,
        currentUser: state.user.currentUser,
        notificationList: state.notification.notificationList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrievePro: () => {
            return dispatch(retrievePro())
        },
        retrieveCounterJob: () => {
            return dispatch(retrieveCounterJob())
        },
        listCollaborator: () => {
            return dispatch(listCollaborator())
        },
        destroyCollaborator: (id) => {
            return dispatch(destroyCollaborator(id)).then((response) => {
                dispatch(addAlertSuccess('Collaborateur supprimé'))
            })
        },
        listNotification: () => {
            return dispatch(listNotification())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
