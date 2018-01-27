import { connect } from 'react-redux'

import JobList from '../components/JobList'
import { listJob, retrieveCounterJob, destroyJob } from '../JobActions'
import { addAlertSuccess } from '../../alert/AlertActions'

const mapStateToProps = (state) => {
    return {
        jobList: state.job.jobList,
        jobActive: state.job.jobActive,
        jobCounter: state.job.jobCounter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listJob: (page = null, search = null) => {
            return dispatch(listJob(page, search))
        },
        retrieveCounterJob: () => {
            return dispatch(retrieveCounterJob())
        },
        destroyJob: (id) => {
            return dispatch(destroyJob(id)).then((response) => {
                dispatch(retrieveCounterJob())
                dispatch(addAlertSuccess('Job supprimé'))
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList)
