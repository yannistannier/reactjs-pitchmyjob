import { connect } from 'react-redux'

import InvitationPanel from '../components/InvitationPanel'
import { listInvitationEmail } from '../JobActions'
import { addAlertSuccess } from '../../alert/AlertActions'


const mapStateToProps = (state) => {
    return {
        invitationEmailList: state.job.invitationEmailList,
        jobList: state.job.jobList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listInvitationEmail: (id) => {
            return dispatch(listInvitationEmail(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationPanel)
