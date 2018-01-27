import React from 'react'
import { Link } from 'react-router'

export default class MessageJobAsideListItem extends React.Component {
    render() {
        const { job, isActive, handleJobClick } = this.props

        return (
            <Link className={'list-group-item' + (isActive ? ' active' : '')} onClick={() => handleJobClick(job.id)}>
                <div className="list-content">
                    <span className="item-right">
                        {/*<span className="tag tag-success up">6</span>*/}
                    </span>
                    <span className="list-text">{job.title}</span>
                </div>
            </Link>
        )
    }
}
