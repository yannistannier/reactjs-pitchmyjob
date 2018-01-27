import { connect } from 'react-redux'

import LayoutLogged from '../components/LayoutLogged'
import { retrieveUserFromToken } from '../../user/UserActions'

const mapStateToProps = (state) => {
    return {
        currentUser: state.user,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        retrieveUserFromToken: () => {
            let token = localStorage.getItem('token')
            if (!token || token === '') {
                return;
            }

            dispatch(retrieveUserFromToken(token))
                .catch((error) => {
                    localStorage.removeItem('token')
                    ownProps.router.push('/login/')
                })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutLogged)
