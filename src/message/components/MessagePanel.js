import React from 'react'

import SlidingPane from 'react-sliding-pane'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'

import MessagePanelMessageList from './MessagePanelMessageList'
import MessagePanelFormContainer from '../containers/MessagePanelFormContainer'

export default class MessagePanel extends React.Component {
    componentDidMount() {
        this.props.retrieveCandidacy(this.props.params.candidacyId)
        this.props.listCandidacyMessage(this.props.params.candidacyId)
    }

    render() {
        const { nextCandidacyMessage } = this.props
        const { candidacyActive, candidacyMessageList } = this.props

        let candidacyResult = null
        if (candidacyActive.error) {
            candidacyResult = <LoadingError />
        }
        else if (candidacyActive.fetched) {
            const { applicant } = candidacyActive.candidacy

            candidacyResult = (
                <div>
                    <header className="slidePanel-header">
                        <div className="slidePanel-actions" aria-label="actions" role="group">
                            <button type="button" className="btn btn-icon btn-pure btn-inverse slidePanel-close actions-top icon md-close" aria-hidden="true" onClick={() => this.props.router.goBack()}></button>
                        </div>
                        <h1>{applicant.user.first_name} {applicant.user.last_name}</h1>
                        <div>
                            <div>{applicant.title}</div>
                        </div>
                    </header>
                    <div className="slidePanel-inner">
                        <MessagePanelMessageList
                            {...candidacyMessageList}
                            nextCandidacyMessage={nextCandidacyMessage}
                            candidacyId={this.props.params.candidacyId}
                        />
                        <MessagePanelFormContainer candidacyId={this.props.params.candidacyId} />
                    </div>
                </div>
            )
        }
        else {
            candidacyResult = <Loader />
        }

        return (
            <SlidingPane
                className='slidePanel slidePanel-right slidePanel-show app-mailbox-custom'
                isOpen={true}
                onRequestClose={() => {this.props.router.goBack()}}
            >
                <div className="app-mailbox">
                    {candidacyResult}
                </div>
            </SlidingPane>
        )
    }
}
