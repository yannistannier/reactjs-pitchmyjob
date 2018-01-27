import React from 'react'

import ProCard from './ProCard'
import JobCounterCard from './JobCounterCard'
import CollaboratorCard from './CollaboratorCard'
import NotificationCard from './NotificationCard'

export default class Dashboard extends React.Component {
    componentDidMount() {
        this.props.retrievePro()
        this.props.retrieveCounterJob()
        this.props.listCollaborator()
        this.props.listNotification()
    }

    render() {
        const { destroyCollaborator } = this.props
        const { pro, jobCounter, collaborator, currentUser, notificationList } = this.props

        return (
            <div className="page-content container-fluid">
                <div className="row" data-plugin="matchHeight" data-by-row="true">
                    <div className="col-xxl-4 col-xl-4 col-lg-12 col-xs-12">
                        <ProCard pro={pro} />
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-12 col-xs-12">
                        <JobCounterCard counter={jobCounter} />
                        <div className="col-xl-6 col-lg-6 col-xs-12">
                            <CollaboratorCard currentUser={currentUser} collaborators={collaborator} onDelete={destroyCollaborator} />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-xs-12">
                            <NotificationCard notifications={notificationList} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
