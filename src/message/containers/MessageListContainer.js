import { connect } from 'react-redux'

import MessageList from '../components/MessageList'
import { listJobCandidacyMessage } from '../MessageActions'
import { listJob } from '../../job/JobActions'

const mapStateToProps = (state) => {
    return {
        jobList: state.job.jobList,
        jobCandidacyMessageList: state.message.jobCandidacyMessageList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listJob: () => {
            return dispatch(listJob(null, null, 'is_visible'))
        },
        listJobCandidacyMessage: (jobId, page = null, search = null) => {
            return dispatch(listJobCandidacyMessage(jobId, page, search))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
