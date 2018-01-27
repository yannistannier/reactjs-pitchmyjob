import { connect } from 'react-redux'

import Alert from '../components/Alert'
import { hideAlert } from '../AlertActions'

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideAlert: (key) => {
            return dispatch(hideAlert(key))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
