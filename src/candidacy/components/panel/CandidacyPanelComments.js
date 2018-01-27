import React from 'react'

import Loader from '../../../core/components/Loader'
import LoadingError from '../../../core/components/LoadingError'
import CandidacyPanelCommentsFormContainer from '../../containers/panel/CandidacyPanelCommentsFormContainer'
import { toLocaleString } from '../../../utils/date'

export default class CandidacyPanelComments extends React.Component {
    constructor(props) {
        super(props)

        this.getNextPage.bind(this)
    }

    getNextPage() {
        if (this.props.pagination && this.props.pagination.next) {
            this.props.nextCommentsCandidacy(this.props.candidacyId, this.props.pagination.next_cursor)
        }
    }

    render() {
        const { candidacyId, currentUser, nextPending, fetched, error, comments, pagination } = this.props

        let commentsResult = null
        if (error) {
            commentsResult = (
                <div className="comment media">
                    <div className="media-body">
                        <div className="comment-body">
                            <div className="comment-content">
                                <LoadingError />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (fetched) {
            if (comments.length > 0) {
                commentsResult = comments.map((comment) => {
                    const { collaborator_extra } = comment
                    return (
                        <div key={comment.id} className="comment media">
                            <div className="media-left">
                                <a className="avatar avatar-lg" href="#">
                                    <img src={collaborator_extra.photo} alt="..." />
                                </a>
                            </div>
                            <div className="media-body">
                                <div className="comment-body">
                                    <a className="comment-author" href="#">{collaborator_extra.first_name} {collaborator_extra.last_name}</a>
                                    <div className="comment-meta">
                                        <span className="date">{toLocaleString(comment.created)}</span>
                                    </div>
                                    <div className="comment-content">
                                        {comment.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            else {
                commentsResult = (
                        <div className="comment media">
                            <div className="media-body">
                                <div className="comment-body">
                                    <div className="comment-content">
                                        Aucun commentaire pour ce candidat
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        }
        else {
            commentsResult = (
                <div className="comment media">
                    <div className="media-body">
                        <div className="comment-body">
                            <div className="comment-content">
                                <Loader />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="tab-pane" id="exampleTabsLineThree" role="tabpanel">
                <div className="comments">
                    <label><i className="icon md-comments m-r-10"></i> Commentaire sur le candidat</label>
                    {
                        fetched && !nextPending && pagination && pagination.next &&
                        <div>
                            <button onClick={() => this.getNextPage()} className="btn btn-primary btn-block">Afficher les messages précédents</button>
                        </div>
                    }
                    {
                        nextPending && <Loader />
                    }
                    <div className="comments-history">{commentsResult}</div>
                    <div className="comment media" style={{borderBottom: '0'}}>
                        <div className="media-left">
                            <a className="avatar avatar-lg" href="#">
                            <img src={currentUser.photo} alt="..." />
                            </a>
                        </div>
                        {fetched && <CandidacyPanelCommentsFormContainer candidacyId={candidacyId} />}
                    </div>
                </div>
            </div>
        )
    }
}
