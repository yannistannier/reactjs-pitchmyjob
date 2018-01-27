import { connect } from 'react-redux'

import InvitationPanelForm from '../../components/panel/InvitationPanelForm'
import { createInvitationEmail } from '../../JobActions'
import { addAlertSuccess } from '../../../alert/AlertActions'


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createInvitationEmail: (id, values) => {
            return dispatch(createInvitationEmail(id, values))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationPanelForm)

