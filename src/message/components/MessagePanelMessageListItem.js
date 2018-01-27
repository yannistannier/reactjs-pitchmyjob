import React from 'react'

import { toLocaleString } from '../../utils/date'

export default class MessagePanelMessageListItem extends React.Component {
    render() {
        const { candidacyMessage } = this.props

        return (
            <section className="slidePanel-inner-section">
                <div className="mail-header">
                    <div className="mail-header-main">
                        <a className="avatar" href="#">
                            <img src={candidacyMessage.emmiter_extra.photo} alt="..." />
                        </a>
                        <div>
                            <span className="name">{candidacyMessage.emmiter_extra.first_name} {candidacyMessage.emmiter_extra.last_name}</span>
                        </div>
                    </div>
                    <div className="mail-header-right">
                        <span className="time">{toLocaleString(candidacyMessage.created)}</span>
                    </div>
                </div>
                <div className="mail-content">
                    {candidacyMessage.message}
                </div>
            </section>
        )
    }
}
