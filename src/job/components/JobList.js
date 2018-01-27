import React from 'react'
import { Link } from 'react-router'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import Pagination from '../../core/components/Pagination'
import JobListItem from './JobListItem'

export default class JobList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchTerm: this.props.location.query.search || '',
            page: this.props.params.page - 1 || 0,
        }

        this.searchUpdated = this.searchUpdated.bind(this)
        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    componentDidMount() {
        this.props.listJob(this.props.params.page || null, this.state.searchTerm)
        this.props.retrieveCounterJob()
    }

    searchUpdated(event) {
        this.setState({searchTerm: event.target.value})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.action === 'POP') {
            if (this.props.params.page !== nextProps.params.page) {
                this.handlePageClick({selected: parseInt(nextProps.params.page - 1 || 0, 10)})
            }
        }
    }

    handleSearchFormSubmit(event) {
        event.preventDefault()
        this.setState({page: 0})
        this.props.listJob(null, this.state.searchTerm)

        let query = {}
        if (this.state.searchTerm) {
            query['search'] = this.state.searchTerm
        }

        this.props.router.push({
            pathname: '/jobs/',
            query: query
        })
    }

    handlePageClick(data) {
        let newPage = data.selected + 1

        this.setState({page: data.selected})
        this.props.listJob(newPage, this.state.searchTerm)

        let query = {}
        if (this.state.searchTerm) {
            query['search'] = this.state.searchTerm
        }

        this.props.router.push({
            pathname: '/jobs/' + newPage + '/',
            query: query
        })
    }

    render() {
        const { destroyJob } = this.props
        const { jobList, jobCounter, jobActive } = this.props

        let jobListResult = null
        if (jobList.error) {
            jobListResult = (
                <tr>
                    <td colSpan="5"><LoadingError /></td>
                </tr>
            )
        }
        else if (jobList.fetched) {
            if (jobList.jobs.length > 0) {
                jobListResult = jobList.jobs.map((job) => {
                    const deleted = (jobActive.job === job)
                    return <JobListItem key={job.id} job={job} destroyJob={destroyJob.bind(this)} deleted={deleted} />
                })
            }
            else {
                jobListResult = (
                    <tr>
                        <td colSpan="5">Aucun résultat</td>
                    </tr>
                )
            }
        }
        else {
            jobListResult = (
                <tr>
                    <td colSpan="5"><Loader /></td>
                </tr>
            )
        }

        return (
            <div className="app-work">
                <div className="page-content">
                    <div className="panel">
                        <div className="panel-heading">
                            <form className="panel-search-form" role="search" style={{paddingLeft: 0, marginLeft: 0}} onSubmit={this.handleSearchFormSubmit}>
                                <div className="input-search">
                                    <i className="input-search-icon md-search" aria-hidden="true"></i>
                                    <input type="text" className="form-control" id="inputSearch" name="search" value={this.state.searchTerm} placeholder="Rechercher..." onChange={this.searchUpdated} />
                                </div>
                            </form>
                            <ul className="panel-info">
                                <li>
                                    <div className="num green-600">{jobCounter.fetched ? jobCounter.results.visible : '...'}</div>
                                    <p>En cours</p>
                                </li>
                                <li>
                                    <div className="num red-600">{jobCounter.fetched ? jobCounter.results.expired : '...'}</div>
                                    <p>Expirées</p>
                                </li>
                                <li>
                                    <div className="num orange-600">{jobCounter.fetched ? jobCounter.results.pending : '...'}</div>
                                    <p>En attente</p>
                                </li>
                            </ul>
                        </div>
                        <div className="panel-body">
                            <p>
                                <Link to="/jobs/create/" className="btn btn-success">Ajouter une offre</Link>
                            </p>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Annonces</th>
                                        <th>Candidatures</th>
                                        <th></th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="no-underline">
                                    {jobListResult}
                                </tbody>
                            </table>
                        </div>
                        <div className="panel-footer">
                            <nav>
                                {jobList.pagination && jobList.pagination.count > 0 &&
                                    <Pagination
                                        forcePage={this.state.page}
                                        pageCount={jobList.pagination.num_pages}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={2}
                                        onPageChange={this.handlePageClick} />
                                }
                            </nav>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}
