import React from 'react'
import { Link } from 'react-router'

import { toLocaleDateString } from '../../utils/date'

export default class CandidacyListItem extends React.Component {
    render() {
        const { requestCandidacy, approveCandidacy, disapproveCandidacy } = this.props
        const { candidacy, statusUpdating } = this.props
        const { jobId, status, page } = this.props.params

        let btnActions = null
        if (!statusUpdating) {
            if (candidacy.status === 'L') {
                btnActions = (
                    <div>
                        <a className="dropdown-item" href="#" role="menuitem" onClick={() => requestCandidacy(jobId, candidacy.applicant.id, candidacy.id)}>
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

        return (
            <tr key={candidacy.id}>
                {
                    btnActions &&
                    <td className="w-100">
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline btn-default dropdown-toggle" id="exampleSizingDropdown3" data-toggle="dropdown" aria-expanded="false">
                                <span className="icon wb-menu"></span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="exampleSizingDropdown3" role="menu">{btnActions}</div>
                          </div>
                    </td>
                }
                {
                    statusUpdating &&
                    <td className="w-100">
                        <span className="loader loader-circle"></span>
                    </td>
                }
                <td className="w-50">
                   <div className="media-left">
                        <div className="avatar">
                            <img src={candidacy.applicant.user.photo} alt="..." />
                        </div>
                    </div>
                </td>
                <td className="subject">
                    <div className="table-content">
                        <p className="blue-grey-500">
                            <Link to={'/jobs/' + jobId + '/candidacies/' + status + '/' + page + '/cv/' + candidacy.id + '/'}>
                                {candidacy.applicant.user.first_name} {candidacy.applicant.user.last_name}
                            </Link>
                        </p>
                        <p>
                            {candidacy.applicant.title}
                        </p>
                    </div>
                </td>
                <td className="text-xs-center">
                    <span> {toLocaleDateString(candidacy.date_matching)} </span>
                </td>
            </tr>
        )
    }
}
