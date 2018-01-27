import React from 'react'

import MessageJobAsideList from './MessageJobAsideList'
import MessageJobCandidacyList from './MessageJobCandidacyList'

export default class MessageList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            page: this.props.params.page - 1 || 0,
            search: this.props.location.query.search || '',
        }

        this.handleJobClick = this.handleJobClick.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.searchUpdated = this.searchUpdated.bind(this)
        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
    }

    componentDidMount() {
        this.props.listJob()

        const jobId = parseInt(this.props.params.jobId, 10) || null
        if (jobId) {
            this.props.listJobCandidacyMessage(jobId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.action === 'POP') {
            if (this.props.params.jobId !== nextProps.params.jobId) {
                let jobId = parseInt(nextProps.params.jobId, 10)
                let page = parseInt(nextProps.params.page || 0, 10)
                this.handleJobClick(jobId, page, false)
            }
            else if (this.props.params.page !== nextProps.params.page || this.props.params.jobId !== nextProps.params.jobId) {
                this.handlePageClick({selected: parseInt(nextProps.params.page - 1 || 0, 10)}, false)
            }
        }
    }

    handleJobClick(jobId, page=1, pushRoute=true) {
        page = parseInt(page, 10)

        this.setState({page: (page - 1), search: ''})
        this.props.listJobCandidacyMessage(jobId, (page || null), null)

        const route = {
            pathname: '/messages/' + jobId + '/' + page + '/',
            query: {...this.props.location.query, search: undefined}
        }

        if (pushRoute) {
            this.props.router.push(route)
        }
        else {
            this.props.router.replace(route)
        }
    }

    handlePageClick(data, pushRoute=true) {
        let newPage = data.selected + 1

        this.setState({page: data.selected})
        this.props.listJobCandidacyMessage(this.props.params.jobId, newPage, this.state.search)

        const route = {
            pathname: '/messages/' + this.props.params.jobId + '/' + newPage + '/',
            query: this.props.location.query
        }

        if (pushRoute) {
            this.props.router.push(route)
        }
        else {
            this.props.router.replace(route)
        }
    }

    searchUpdated(event) {
        this.setState({search: event.target.value})
    }

    handleSearchFormSubmit(event) {
        event.preventDefault()
        this.setState({page: 0})
        this.props.listJobCandidacyMessage(this.props.params.jobId, null, this.state.search)

        let query = {}
        if (this.state.search) {
            query['search'] = this.state.search
        }

        this.props.router.push({
            pathname: '/messages/' + this.props.params.jobId + '/1/',
            query: query
        })
    }

    render() {
        const { jobList, jobCandidacyMessageList } = this.props

        const jobId = parseInt(this.props.params.jobId, 10) || null
        const candidacyId = parseInt(this.props.params.candidacyId, 10) || null

        let currentJob = null
        if (!jobList.error && jobList.fetched && jobId) {
            currentJob = jobList.jobs.find((job) => {
                return job.id === jobId
            })
        }

        return (
            <div className="bg-white app-mailbox page-aside-left">
                <MessageJobAsideList
                    jobList={jobList}
                    currentJobId={jobId}
                    handleJobClick={this.handleJobClick}
                />
                <div className="page-main">
                    {
                        jobId &&
                        <MessageJobCandidacyList
                            jobCandidacyMessageList={jobCandidacyMessageList}
                            currentJob={currentJob}
                            urlParams={this.props.params}
                            currentCandidacy={candidacyId}
                            searchUpdated={this.searchUpdated}
                            handleSearchFormSubmit={this.handleSearchFormSubmit}
                            handlePageClick={this.handlePageClick}
                            searchValue={this.state.search}
                            currentPage={this.state.page}
                        />
                    }
                    {
                        !jobId &&
                        <p>Veuillez selectionner une offre pour afficher les conversations liées</p>
                    }
                </div>
                {this.props.children}
            </div>
        )
    }
}
