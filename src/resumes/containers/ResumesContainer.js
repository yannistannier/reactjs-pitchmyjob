import { connect } from 'react-redux'

import Resumes from '../components/Resumes'
import { listJob } from '../../job/JobActions'

const mapStateToProps = (state) => {
    return {
        jobList: state.job.jobList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listJob: () => {
            return dispatch(listJob(null, null, 'is_visible'))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resumes)
