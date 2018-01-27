import React from 'react'
import { Link } from 'react-router'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import Pagination from '../../core/components/Pagination'
import { toLocaleDateString } from '../../utils/date'

export default class ResumesList extends React.Component {
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
        this.props.listResume(this.props.params.jobId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.action === 'POP') {
            if (this.props.params.jobId !== nextProps.params.jobId) {
                let jobId = nextProps.params.jobId
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
        this.props.listResume(jobId, (page || null), null)

        const route = {
            pathname: '/resumes/' + jobId + '/' + page + '/',
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
        this.props.listResume(this.props.params.jobId, newPage, this.state.search)

        const route = {
            pathname: '/resumes/' + this.props.params.jobId + '/' + newPage + '/',
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
        this.props.listResume(this.props.params.jobId, null, this.state.search)

        let query = {}
        if (this.state.search) {
            query['search'] = this.state.search
        }

        this.props.router.push({
            pathname: '/resumes/' + this.props.params.jobId + '/1/',
            query: query
        })
    }

    render() {
        const { jobList } = this.props

        let currentJobName = null
        let jobListResult = null
        if (jobList.error) {
            jobListResult = (
                <a className="list-group-item" href="#">
                    <LoadingError />
                </a>
            )
        }
        else if (jobList.fetched) {
            if (jobList.fetched) {
                if (jobList.jobs.length > 0) {
                    jobListResult = jobList.jobs.map((job) => {
                        const isActive = job.id === parseInt(this.props.params.jobId, 10)

                        if (isActive) {
                            currentJobName = job.title
                        }

                        return (
                            <Link key={job.id} className={'list-group-item' + (isActive ? ' active' : '')} role="tab" onClick={() => this.handleJobClick(job.id)}>
                                <span className="list-group-item-content font-weight-400">
                                    {job.title}
                                </span>
                                <div className="metas">{toLocaleDateString(job.last_payment)} - {job.contract_types_extra.join(', ')}</div>
                            </Link>
                        )
                    })
                }
                else {
                    jobListResult = (
                        <a className="list-group-item" href="#">
                            Aucune offre en cours
                        </a>
                    )
                }
            }
        }
        else {
            jobListResult = (
                <a className="list-group-item" href="#">
                    <Loader />
                </a>
            )
        }


        const { resumeList } = this.props

        let resumeListResult = null
        if (resumeList.error) {
            resumeListResult = (
                <tr>
                    <td><LoadingError /></td>
                </tr>
            )
        }
        else if (resumeList.fetched) {
            if (resumeList.resumes.length > 0) {
                resumeListResult = resumeList.resumes.map((resume) => {
                    return (
                        <tr key={resume.id}>
                            <td className="cell-30 responsive-hide"></td>
                            <td className="cell-100 responsive-hide">
                                <a className="avatar" href="#">
                                    <img className="img-fluid" src={resume.photo} alt="..." />
                                </a>
                            </td>
                            <td>
                                <div className="content">
                                    <Link to={'/resumes/' + this.props.params.jobId + '/' + this.props.params.page + '/cv/' + resume.id + '/'}>
                                        <div className="title font-weight-400 font-size-16">
                                            {resume.first_name} {resume.last_name} <span className="font-weight-300"> - {resume.title}</span>
                                        </div>
                                    </Link>
                                    <div className="metas">
                                        <span className="tags">Master 1 </span>
                                        <span className="tags">Experience 2-3 ans </span>
                                        <span className="tags">Paris, France</span>
                                    </div>
                                </div>
                            </td>
                            <td className="cell-30 responsive-hide"></td>
                        </tr>
                    )
                })
            }
            else {
                resumeListResult = (
                    <tr>
                        <td>Aucun résultat</td>
                    </tr>
                )
            }
        }
        else {
            resumeListResult = (
                <tr>
                    <td><Loader /></td>
                </tr>
            )
        }

        return (
            <div className="bg-white app-mailbox page-aside-left">
                <div className="page-aside">
                    <div className="page-aside-switch">
                        <i className="icon wb-chevron-left" aria-hidden="true"></i>
                        <i className="icon wb-chevron-right" aria-hidden="true"></i>
                    </div>
                    <div className="page-aside-inner page-aside-scroll">
                        <div data-role="container">
                            <div data-role="content">
                                <section className="page-aside-section">
                                    <h5 className="page-aside-title">Mes offres</h5>
                                    <div className="list-group">
                                        {jobListResult}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-main">
                    <div className="page-header">
                        <h1 className="page-title">CvTheque {currentJobName}</h1>
                        <div className="page-header-actions">
                            <form role="search" onSubmit={this.handleSearchFormSubmit}>
                                <div className="input-search input-search-dark">
                                    <i className="input-search-icon wb-search" aria-hidden="true"></i>
                                    <input className="form-control" name="search" value={this.state.search} placeholder="Rechercher..." type="text" onChange={this.searchUpdated} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="page-content-table" data-plugin="selectable">
                        <div className="page-content-actions">
                            <div className="pull-xs-left filter">
                                <span>Filter :</span>
                                <div className="dropdown">
                                    <button type="button" className="btn btn-pure" data-toggle="dropdown" aria-expanded="false">
                                    Check all
                                    <span className="icon wb-chevron-down-mini" aria-hidden="true"></span>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right animation-scale-up animation-top-right animation-duration-250"
                                        role="menu">
                                        <a className="dropdown-item" href="#">Check read</a>
                                        <a className="dropdown-item" href="#">Check unread</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">French</a>
                                        <a className="dropdown-item" href="#">Spanish</a>
                                    </div>
                                </div>
                            </div>
                            <div className="actions-main">
                            </div>
                        </div>
                        <table id="mailboxTable" className="table no-underline" data-plugin="animateList" data-animate="fade" data-child="tr">
                            <tbody>
                                {resumeListResult}
                            </tbody>
                        </table>
                        <ul className="pagination pagination-gap m-b-20">
                            {resumeList.pagination && resumeList.pagination.total > 0 &&
                                <Pagination
                                    forcePage={this.state.page}
                                    pageCount={resumeList.pagination.pages}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={this.handlePageClick} />
                            }
                        </ul>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}
