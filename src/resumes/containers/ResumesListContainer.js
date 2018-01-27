import { connect } from 'react-redux'

import ResumesList from '../components/ResumesList'
import { listJob } from '../../job/JobActions'
import { listResume } from '../ResumeActions'

const mapStateToProps = (state) => {
    return {
        jobList: state.job.jobList,
        resumeList: state.resume.resumeList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listJob: () => {
            return dispatch(listJob(null, null, 'is_visible'))
        },
        listResume: (jobId, page = null, search = null) => {
            return dispatch(listResume(jobId, page, search))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumesList)
