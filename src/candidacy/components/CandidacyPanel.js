import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import CandidacyPanelCV from './panel/CandidacyPanelCV'
import CandidacyPanelComments from './panel/CandidacyPanelComments'
import { getCandidacyTagClass, getCandidacyStateLabel } from '../utils'

export default class CandidacyPanel extends React.Component {
    componentDidMount() {
        this.props.retrieveCandidacy(this.props.params.candidacyId)
        this.props.listCommentsCandidacy(this.props.params.candidacyId)
    }

    render() {
        const { nextCommentsCandidacy, requestCandidacy, approveCandidacy, disapproveCandidacy } = this.props
        const { candidacyActive, candidacyStateUpdate, commentsCandidacyList, currentUser } = this.props

        let candidacyResult = null
        if (candidacyActive.error) {
            candidacyResult = <LoadingError />
        }
        else if (candidacyActive.fetched) {
            const { candidacy } = candidacyActive
            const showVideoTab = ['V', 'S', 'N'].indexOf(candidacy.status) !== -1

            const statusUpdating = (candidacyStateUpdate.candidacyId === candidacy.id)
            let btnActions = null
            if (!statusUpdating) {
                if (candidacy.status === 'L') {
                    btnActions = (
                        <div>
                            <a className="dropdown-item" href="#" role="menuitem" onClick={() => requestCandidacy(this.props.params.jobId, candidacy.applicant.id, candidacy.id)}>
                                Envoyer une demande
                            </a>
                            <a className="dropdown-item" href="#" role="menuitem" onClick={() => disapproveCandidacy(candidacy.id)}>
                                Candidature non retenu
                            </a>
                        </div>
                    )
                }
                else if (candidacy.status === 'R') {
                    btnActions = (
                        <div>
                            <a className="dropdown-item" href="#" role="menuitem" onClick={() => disapproveCandidacy(candidacy.id)}>
                                Candidature non retenu
                            </a>
                        </div>
                    )
                }
                else if (candidacy.status === 'V') {
                    btnActions = (
                        <div>
                            <a className="dropdown-item" href="#" role="menuitem" onClick={() => approveCandidacy(candidacy.id)}>
                                Candidature retenu
                            </a>
                            <a className="dropdown-item" href="#" role="menuitem" onClick={() => disapproveCandidacy(candidacy.id)}>
                                Candidature non retenu
                            </a>
                        </div>
                    )
                }
            }

            candidacyResult = (
                <div className="app-work app-panel" >
                    <header className="card m-0">
                        <div className="card-header white bg-cyan-600 p-30 clearfix">
                            <a className="avatar avatar-100 pull-xs-left m-r-20 img-bordered bg-white" href="#">
                                <img src={candidacy.applicant.user.photo} alt="" />
                            </a>
                            <div className="pull-xs-left">
                                <div className="font-size-20 m-b-0">{candidacy.applicant.user.first_name} {candidacy.applicant.user.last_name}</div>
                                <p className="m-b-5 text-nowrap job-title">
                                    <span className="text-break font-size-18">{candidacy.applicant.title}</span>
                                </p>
                                <p className="m-b-5 text-nowrap"><i className="icon wb-map m-r-10" aria-hidden="true"></i>
                                    <span className="text-break">{candidacy.applicant.country} {candidacy.applicant.locality}</span>
                                </p>
                            </div>
                        </div>
                        <div className="slidePanel-actions" aria-label="actions" role="group">
                            {
                                statusUpdating &&
                                <div className="dropdown pull-xs-left">
                                    <span className="loader loader-circle"></span>
                                </div>
                            }
                            {
                                btnActions &&
                                <div className="dropdown pull-xs-left">
                                    <button type="button" className="btn btn-pure btn-inverse icon wb-menu" data-toggle="dropdown" aria-hidden="true"></button>
                                    <div className="dropdown-menu dropdown-menu-right bullet" role="menu">
                                        {btnActions}
                                    </div>
                                </div>
                            }
                            <button type="button" className="btn btn-pure btn-inverse slidePanel-close actions-top icon wb-close" aria-hidden="true"onClick={() => this.props.router.goBack()}></button>
                            <p>
                                <span className={'font-size-14 tag tag-' + getCandidacyTagClass(candidacy.status)}>{getCandidacyStateLabel(candidacy.status)}</span>
                            </p>
                        </div>
                    </header>
                    <div className="slidePanel-inner p-0">
                        <section className="slidePanel-inner-section p-t-5">
                            <div className="nav-tabs-horizontal" data-plugin="tabs">
                                <ul className={'nav nav-tabs nav-tabs-line cv-panel-' + (showVideoTab ? '3' : '2')} role="tablist">
                                    <li className="nav-item " role="presentation"><a className="nav-link active" data-toggle="tab" href="#exampleTabsLineOne" aria-controls="exampleTabsLineOne" role="tab" aria-expanded="true">CV du candidat</a></li>
                                    {showVideoTab && <li className="nav-item" role="presentation"><a className="nav-link" data-toggle="tab" href="#exampleTabsLineTwo" aria-controls="exampleTabsLineTwo" role="tab" aria-expanded="false">Video</a></li>}
                                    <li className="nav-item" role="presentation"><a className="nav-link" data-toggle="tab" href="#exampleTabsLineThree" aria-controls="exampleTabsLineThree" role="tab">Commentaires</a></li>
                                </ul>
                                <div className="tab-content p-t-20 p-b-20 p-x-20">
                                    <CandidacyPanelCV candidacy={candidacyActive.candidacy} />
                                    <CandidacyPanelComments
                                        candidacyId={candidacy.id}
                                        currentUser={currentUser}
                                        nextCommentsCandidacy={nextCommentsCandidacy}
                                        {...commentsCandidacyList} />
                                    {
                                        showVideoTab &&
                                        <div className="tab-pane" id="exampleTabsLineTwo" role="tabpanel" aria-expanded="false">
                                            <div>Question 1 : Pourquoi voulez-vosu travailler chez nous ? ? </div>
                                            <div className=" player" data-plugin="plyr">
                                                <video poster="https://v2-pitchmyjob.s3-eu-west-1.amazonaws.com/static/assets/examples/images/poster.jpg" controls="" crossOrigin="" style={{width: '60%'}}>
                                                    <source type="video/mp4" src="https://cdn.selz.com/plyr/1.0/movie.mp4" />
                                                    <source type="video/webm" src="https://cdn.selz.com/plyr/1.0/movie.webm" />
                                                    <a href="https://cdn.selz.com/plyr/1.0/movie.mp4">Download</a>
                                                </video>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )
        }
        else {
            candidacyResult = <Loader />
        }

        return (
            <div>
                <SlidingPane
                    className='slidePanel slidePanel-right slidePanel-show'
                    isOpen={true}
                    onRequestClose={() => {this.props.router.goBack()}}>
                        {candidacyResult}
                </SlidingPane>
            </div>
        )
    }
}
