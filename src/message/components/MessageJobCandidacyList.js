import React from 'react'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import Pagination from '../../core/components/Pagination'
import MessageJobCandidacyListItem from './MessageJobCandidacyListItem'

import { toLocaleDateString } from '../../utils/date'

export default class MessageJobCandidacyList extends React.Component {
    render() {
        const { searchUpdated, handleSearchFormSubmit, handlePageClick } = this.props
        const { jobCandidacyMessageList, currentJob, urlParams, currentCandidacy, searchValue, currentPage } = this.props

        let resultList = null
        if (jobCandidacyMessageList.error) {
            resultList = (
                <tr><td><LoadingError /></td></tr>
            )
        }
        else if (jobCandidacyMessageList.fetched) {
            if (jobCandidacyMessageList.fetched) {
                if (jobCandidacyMessageList.jobCandidacyMessages.length > 0) {
                    resultList = jobCandidacyMessageList.jobCandidacyMessages.map((jobCandidacyMessage) => {
                        return (
                            <MessageJobCandidacyListItem
                                key={jobCandidacyMessage.id}
                                jobCandidacyMessage={jobCandidacyMessage}
                                isActive={(jobCandidacyMessage.id === currentCandidacy)}
                                urlParams={urlParams}
                            />
                        )
                    })
                }
                else {
                    resultList = (
                        <tr><td>Aucune conversation pour cette offre</td></tr>
                    )
                }
            }
        }
        else {
            resultList = (
                <tr><td><Loader /></td></tr>
            )
        }

        return (
            <div>
                {
                    currentJob &&
                    <div className="page-header">
                        <h1 className="page-title">{currentJob.title}</h1>
                        <div className="tags">
                            {
                                currentJob.skills.map((skill, index) => {
                                    return <span key={index} className="tag tag-default m-r-5 m-b-5">{skill}</span>
                                })
                            }
                            - <span>Publié</span> le {toLocaleDateString(currentJob.created)}
                        </div>
                        <div className="page-header-actions">
                            <form onSubmit={handleSearchFormSubmit}>
                                <div className="input-search input-search-dark">
                                    <i className="input-search-icon md-search" aria-hidden="true"></i>
                                    <input type="text" className="form-control" placeholder="Rechercher..." value={searchValue} onChange={searchUpdated} />
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {
                    !currentJob && <Loader />
                }
                <div id="mailContent" className="page-content page-content-table">
                    <table id="mailboxTable" className="table">
                        <tbody>
                            {resultList}
                        </tbody>
                    </table>
                    {
                        jobCandidacyMessageList.pagination && jobCandidacyMessageList.pagination.count > 0 &&
                        <Pagination
                            forcePage={currentPage}
                            pageCount={jobCandidacyMessageList.pagination.num_pages}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            onPageChange={handlePageClick} />
                    }
                </div>
            </div>
        )
    }
}
