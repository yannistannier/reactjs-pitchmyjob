import { connect } from 'react-redux'

import UserActivate from '../components/UserActivate'
import { activateUser } from '../UserActions'

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        activateUser: (email, token) => {
            return dispatch(activateUser(email, token))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserActivate)
