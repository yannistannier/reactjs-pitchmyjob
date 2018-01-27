import React from 'react'
import { Link } from 'react-router'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import ResumePanelContactFormContainer from '../containers/ResumePanelContactFormContainer'
import { convertStatusAPIToParams, getCandidacyTagClass, getCandidacyStateLabel } from '../../candidacy/utils'

export default class ResumePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showContactForm: false,
        }

        this.toggleContactForm = this.toggleContactForm.bind(this)
    }

    componentDidMount() {
        this.props.retrieveResume(this.props.params.applicantId)
        this.props.existsCandidacyResume(this.props.params.jobId, this.props.params.applicantId)
    }

    toggleContactForm() {
        this.setState({showContactForm: !this.state.showContactForm})
    }

    render() {
        const { resumeActive, existsCandidacy } = this.props
        const { jobId, applicantId } = this.props.params

        let btnLoading = true
        let candidacyStatus = null
        let hasActiveCandidacy = false
        if (existsCandidacy.error || existsCandidacy.fetched) {
            if (existsCandidacy.fetched) {
                hasActiveCandidacy = existsCandidacy.candidacy.status !== 'M'

                candidacyStatus = (
                    <p>
                        <span className={'font-size-14 tag tag-' + getCandidacyTagClass(existsCandidacy.candidacy.status)}>
                            {getCandidacyStateLabel(existsCandidacy.candidacy.status)}
                        </span>
                    </p>
                )
            }

            btnLoading = false
        }

        let resumeResult = null
        if (resumeActive.error) {
            resumeResult = <LoadingError />
        }
        else if (resumeActive.fetched) {
            const { resume } = resumeActive

            resumeResult = (
                <div className="app-work app-panel">
                    <header className="card m-0">
                        <div className="card-header white bg-cyan-600 p-30 clearfix">
                            <a className="avatar avatar-100 pull-xs-left m-r-20 img-bordered bg-white" href="#">
                                <img src={resume.user.photo} alt="" />
                            </a>
                            <div className="pull-xs-left">
                                <div className="font-size-20 m-b-0">{resume.user.first_name} {resume.user.last_name}</div>
                                <p className="m-b-5 text-nowrap job-title">
                                    <span className="text-break font-size-18">{resume.title}</span>
                                </p>
                                <p className="m-b-5 text-nowrap"><i className="icon wb-map m-r-10" aria-hidden="true"></i>
                                    <span className="text-break">{resume.country} {resume.locality}</span>
                                </p>
                            </div>
                        </div>
                        <div className="slidePanel-actions" aria-label="actions" role="group">
                            <button type="button" className="btn btn-pure btn-inverse slidePanel-close actions-top icon wb-close" aria-hidden="true" onClick={() => this.props.router.goBack()}></button>
                            {candidacyStatus}
                        </div>
                    </header>
                    <div className="slidePanel-inner p-t-20">
                        <div className="row">
                            {
                                btnLoading &&
                                <div className="col-sm-12">
                                    <Loader />
                                </div>
                            }
                            {
                                !btnLoading && !hasActiveCandidacy &&
                                <div>
                                    <div className="col-sm-6">
                                        <button className="btn btn-primary btn-block" onClick={() => this.props.requestCandidacy(jobId, applicantId)}>
                                            Inviter à passer video
                                        </button>
                                    </div>
                                    <div className="col-sm-6">
                                        <button className="btn btn-primary btn-block" onClick={() => this.toggleContactForm()}>Contacter</button>
                                    </div>
                                </div>
                            }
                            {
                                !btnLoading && hasActiveCandidacy &&
                                <div>
                                    <div className="col-sm-6">
                                        <Link to={'/messages/' + jobId + '/1/candidacy/' + existsCandidacy.candidacy.id + '/'} className="btn btn-primary btn-block">
                                            Contacter
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link to={'/jobs/' + jobId + '/candidacies/' + convertStatusAPIToParams(existsCandidacy.candidacy.status) + '/1/cv/' + existsCandidacy.candidacy.id + '/'} className="btn btn-success btn-block">
                                            Consulter la candidature
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                        <hr />
                        <div className="user-background card card-shadow p-b-20">
                            <div className="card-header card-header-transparent p-20">
                                <h4 className="card-title m-b-0 text-uppercase">Information au recruteur</h4>
                            </div>
                            <div className="card-block p-t-5">
                                <table>
                                    <tbody>
                                        <tr className="p-y-10 ">
                                            <td className="p-r-25"> Coordonnées</td>
                                            <td className="p-b-10">
                                                <div> {resume.user.email}</div>
                                            </td>
                                        </tr>
                                        <tr className="p-y-10">
                                            <td className="p-r-25"> Poste recherchés</td>
                                            <td className="p-b-10">
                                                <div className="tags">
                                                    {
                                                        resume.wanted_jobs.map((job, index) => {
                                                            return (
                                                                <button key={index} type="button" className="btn btn-outline btn-default m-r-10"> {job}</button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="p-y-10">
                                            <td className="p-r-25"> Contrat recherchés</td>
                                            <td className="p-b-10">
                                                  <div className="tags">
                                                    <button type="button" className="btn btn-outline btn-default">CDI</button>
                                                  </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-header card-header-transparent p-20">
                                <h4 className="card-title m-b-0 text-uppercase">Information sur le candidat</h4>
                            </div>
                            <div className="card-block p-t-5">
                                <h5 className="card-title font-size-16">
                                    <i className="icon wb-clipboard"></i>
                                    <span>Description</span>
                                </h5>
                                <p className="card-text">
                                    {resume.description}
                                </p>
                            </div>
                            <div className="card-block p-t-5 p-b-0">
                                <h5 className="card-title p-b-5 font-size-16">
                                    <i className="icon wb-briefcase"></i>
                                    <span>Experience</span>
                                </h5>
                                <ul className="timeline timeline-single">
                                    {
                                        resume.experiences.map((experience) => {
                                            return (
                                                <li className="timeline-item" key={experience.id}>
                                                    <div className="timeline-dot"></div>
                                                    <div className="timeline-content">
                                                        <span className="block font-weight-400 m-b-5">{experience.position}</span>
                                                        <span className="block m-b-5">{experience.company}</span>
                                                        <span className="block m-b-5">{experience.description}</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="card-block p-t-5 p-b-0">
                                <h5 className="card-title p-b-5 font-size-16">
                                    <i className="icon wb-flag"></i>
                                    <span>Formations</span>
                                </h5>
                                <ul className="timeline timeline-single">
                                    {
                                        resume.educations.map((education) => {
                                            return (
                                                <li className="timeline-item" key={education.id}>
                                                    <div className="timeline-dot"></div>
                                                    <div className="timeline-content">
                                                        <span className="block font-weight-400 m-b-5">{education.degree}</span>
                                                        <span className="block m-b-5">{education.school}</span>
                                                        <span className="block m-b-5">{education.date_start}  {education.data_end}</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="card-block p-t-5 p-b-0">
                                <h5 className="card-title p-b-5 font-size-16">
                                    <i className="icon wb-share"></i>
                                    <span>Competences</span>
                                </h5>
                                {
                                    resume.skills.map((skill) => {
                                        return (
                                            <span key={skill.id} className="tag m-b-10 m-r-10 tag-primary font-weight-400 font-size-14">{skill.name}</span>
                                        )
                                    })
                                }
                            </div>
                            <div className="card-block p-t-15 p-b-0">
                                <h5 className="card-title p-b-5 font-size-16">
                                    <i className="icon wb-chat"></i>
                                    <span>Languages</span>
                                </h5>
                                {
                                    resume.languages.map((language) => {
                                        return (
                                            <span key={language.id} className="tag m-b-10 m-r-10 tag-default font-weight-400 font-size-14">{language.name}</span>
                                        )
                                    })
                                }
                            </div>
                            <div className="card-block p-t-15 p-b-0">
                                <h5 className="card-title p-b-5 font-size-16">
                                    <i className="icon wb-star"></i>
                                    <span>Interets</span>
                                </h5>
                                {
                                    resume.interests.map((interest) => {
                                        return (
                                            <span key={interest.id} className="tag m-b-10 m-r-10 tag-default font-weight-400 font-size-14">{interest.name}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.showContactForm &&
                        <ResumePanelContactFormContainer
                            jobId={jobId}
                            applicantId={applicantId}
                            onClose={this.toggleContactForm}
                        />
                    }
                </div>
            )
        }
        else {
            resumeResult = <Loader />
        }

        return (
            <div>
                <SlidingPane
                    className='slidePanel slidePanel-right slidePanel-show'
                    isOpen={true}
                    onRequestClose={() => {this.props.router.goBack()}}>
                        {resumeResult}
                </SlidingPane>
            </div>
        )
    }
}
