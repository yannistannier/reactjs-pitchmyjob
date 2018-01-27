import React from 'react'
import { Link } from 'react-router'

import { getTagClass, getButtonAction } from '../utils'
import { toLocaleDateString } from '../../utils/date'

export default class JobListItem extends React.Component {
    render() {
        const { job, destroyJob, deleted } = this.props

        let action = null
        if (deleted) {
            action = <span className="loader loader-circle"></span>
        }
        else {
            action = (
                <div className="btn-group">

                    <button type="button" className="btn btn-outline btn-default dropdown-toggle" id="exampleSizingDropdown2" data-toggle="dropdown" aria-expanded="false">
                      <span className="icon wb-menu"></span>
                    </button>

                    <ul role="menu" className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to={'/jobs/edit/' + job.id + '/'} role="menuitem">Modifier l'offre</Link>
                        <Link className="dropdown-item" to={'/jobs/' + job.id + '/question/'} role="menuitem">Modifier la question</Link>
                        <div className="dropdown-divider"></div>
                        <a href="#" role="menuitem" className="dropdown-item" onClick={() => destroyJob(job.id)}>Supprimer</a>
                    </ul>
                </div>
            )
        }

        return (
            <tr className={deleted ? 'active' : ''}>
                <td className="work-status">
                    <span className={'tag tag-' + getTagClass(job.state.code)}>{job.state.label}</span>
                </td>
                <td className="subject">
                    <div className="table-content">
                        <p className="blue-grey-500">
                            <Link to={'/jobs/' + job.id + '/candidacies/to-validate/1/'}>{job.title}</Link>
                        </p>
                        <span className="blue-grey-400">{toLocaleDateString(job.created)} - {job.contract_types_extra.join(', ')} - {job.locality}</span>
                    </div>
                </td>
                <td className="text-xs-center"><span className="tag tag-pill tag-danger">{job.candidacy_count}</span></td>
                <td>{getButtonAction(job.state.code, job.id)}</td>
                <td className="text-xs-center">{action}</td>
            </tr>
        )
    }
}
