import React from 'react'
import { Link } from 'react-router'

import { toLocaleString } from '../../utils/date'

export default class MessageJobCandidacyListItem extends React.Component {
    render() {
        const { jobCandidacyMessage, isActive, urlParams } = this.props

        return (
            <tr className={(isActive ? ' active' : '') + (!jobCandidacyMessage.is_read.is_read ? ' unread' : '')}>
                <td className="cell-100 responsive-hide">
                    <a className="avatar" href="">
                        <img className="img-fluid" src={jobCandidacyMessage.applicant.photo} alt="..." />
                    </a>
                </td>
                <td>
                    <div className="content">
                        <div className="title">
                            <Link to={'/messages/' + urlParams.jobId + '/' + urlParams.page + '/candidacy/' + jobCandidacyMessage.candidacy + '/'}>
                                {jobCandidacyMessage.applicant.first_name} {jobCandidacyMessage.applicant.last_name}
                            </Link>
                        </div>
                        <div className="abstract">{jobCandidacyMessage.message}</div>
                    </div>
                </td>
                <td className="cell-30 responsive-hide"></td>
                <td className="cell-130">
                    <div className="time">{toLocaleString(jobCandidacyMessage.created)}</div>
                </td>
            </tr>
        )
    }
}
