import React from 'react'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import MessagePanelMessageListItem from './MessagePanelMessageListItem'

export default class MessagePanelMessageList extends React.Component {
    constructor(props) {
        super(props)

        this.getNextPage.bind(this)
    }

    getNextPage() {
        if (this.props.pagination && this.props.pagination.next) {
            this.props.nextCandidacyMessage(this.props.candidacyId, this.props.pagination.next_cursor)
        }
    }

    render() {
        const { error, fetched, nextPending, pagination, candidacyMessages } = this.props

        let messageListResult = null
        if (error) {
            messageListResult = <LoadingError />
        }
        else if (fetched) {
            messageListResult = candidacyMessages.map((candidacyMessage) => {
                return <MessagePanelMessageListItem key={candidacyMessage.id} candidacyMessage={candidacyMessage} />
            })
        }
        else {
            messageListResult = <Loader />
        }

        return (
            <div>
                {
                    fetched && !nextPending && pagination && pagination.next &&
                    <div className="p-t-20">
                        <button onClick={() => this.getNextPage()} className="btn btn-primary btn-block">Afficher les messages précédents</button>
                    </div>
                }
                {
                    nextPending && <Loader />
                }
                {messageListResult}
            </div>
        )
    }
}
