import React from 'react'
import { Link } from 'react-router'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import { toLocaleDateString } from '../../utils/date'

export default class Resumes extends React.Component {
    componentWillMount() {
        this.props.listJob()
    }

    render() {
        const { jobList } = this.props

        let jobListResult = null
        if (jobList.error) {
            jobListResult = (
                <li className="animation-scale-up">
                    <div className="panel">
                        <LoadingError />
                    </div>
                </li>
            )
        }
        else if (jobList.fetched) {
            if (jobList.fetched) {
                if (jobList.jobs.length > 0) {
                    jobListResult = jobList.jobs.map((job) => {
                        return (
                            <li key={job.id} className="animation-scale-up">
                                <div className="panel ">
                                    <figure className="overlay overlay-hover animation-hover m-b-0">
                                        <div>
                                            <h4><a>{job.title}</a></h4>
                                            <div className="time">{job.contract_types_extra.join(', ')}</div>
                                            <div className="time">{job.address}</div>
                                            <div className="pull-xs-right text-truncate p-t-10">posté le {toLocaleDateString(job.last_payment)}</div>
                                        </div>
                                        <figcaption className="overlay-panel overlay-background overlay-fade text-xs-center vertical-align">
                                            <Link to={'/resumes/' + job.id + '/1/'}>
                                                <button type="button" className="btn btn-outline btn-default project-button">
                                                    Sourcer
                                                </button>
                                            </Link>
                                        </figcaption>
                                    </figure>
                                </div>
                            </li>
                        )
                    })
                }
                else {
                    jobListResult = (
                        <li className="animation-scale-up">
                            <div className="panel">
                                Aucune offre en cours
                            </div>
                        </li>
                    )
                }
            }
        }
        else {
            jobListResult = (
                <li className="animation-scale-up">
                    <div className="panel">
                        <Loader />
                    </div>
                </li>
            )
        }

        return (
            <div className="resumes-dashboard">
                <div className="page-content container-fluid p-b-5">
                    <div className="card card-block text-xs-center">
                        <h3 className="card-title m-b-30">Rechercher le candidat idéal</h3>
                        <p className="font-size-16">text blabla  text blabla  text blabla  text blabla  vtext blabla  text blabla  v</p>
                        <p className="font-size-16">text blabla  text blabla  text blabla  text blabla  vtext blabla  text blabla  vtext blabla  text blabla  vtext blabla  text blabla  v</p>
                        <Link to="/jobs/create/" className="btn btn-primary">Créer une offre</Link>
                    </div>
                </div>
                <div className="page-content container-fluid p-t-0">
                    <div className="app-projects">
                        <h1 className="page-title font-size-26 font-weight-100">Mes offres</h1>
                        <div className="projects-wrap p-t-15">
                            <ul className="blocks blocks-100 blocks-xxl-5 blocks-lg-4 blocks-md-3 blocks-sm-2" data-plugin="animateList" data-child=">li">
                                <li className="animation-scale-up">
                                    <div className="panel resumes-first-panel">
                                        <div className="text-xs-center p-t-40">
                                            <Link to="/jobs/create/" className="btn btn-primary ">Créer une offre</Link>
                                        </div>
                                    </div>
                                </li>
                                {jobListResult}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
