import React from 'react'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import MessageJobAsideListItem from './MessageJobAsideListItem'

export default class MessageJobAsideList extends React.Component {
    render() {
        const { jobList, currentJobId, handleJobClick } = this.props

        let jobListResult = null
        if (jobList.error) {
            jobListResult = (
                <div className="list-group-item">
                    <div className="list-content">
                        <LoadingError />
                    </div>
                </div>
            )
        }
        else if (jobList.fetched) {
            if (jobList.fetched) {
                if (jobList.jobs.length > 0) {
                    jobListResult = jobList.jobs.map((job) => {
                        return (
                            <MessageJobAsideListItem
                                key={job.id}
                                job={job}
                                isActive={(job.id === currentJobId)}
                                handleJobClick={handleJobClick}
                            />
                        )
                    })

                    jobListResult = <div>{jobListResult}</div>
                }
                else {
                    jobListResult = (
                        <div className="list-group-item">
                            <div className="list-content">
                                Aucune offre en cours
                            </div>
                        </div>
                    )
                }
            }
        }
        else {
            jobListResult = (
                <div className="list-group-item">
                    <div className="list-content">
                        <Loader />
                    </div>
                </div>
            )
        }

        return (
            <div className="page-aside">
                <div className="page-aside-switch">
                    <i className="icon md-chevron-left" aria-hidden="true"></i>
                    <i className="icon md-chevron-right" aria-hidden="true"></i>
                </div>
                <div className="page-aside-inner page-aside-scroll">
                    <div data-role="container">
                        <div data-role="content">
                            <div className="page-aside-section">
                                <h5 className="page-aside-title">Par offre active</h5>
                                <div className="list-group">
                                    {jobListResult}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
