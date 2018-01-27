import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import SideBar from '../components/SideBar'
import { addAlertSuccess } from '../../alert/AlertActions'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logoutUser: () => {
            localStorage.removeItem('token')
            dispatch(addAlertSuccess('Vous êtes deconnecté'))
            browserHistory.push('/login/')
        },
    }
}

export default connect(null, mapDispatchToProps)(SideBar)
