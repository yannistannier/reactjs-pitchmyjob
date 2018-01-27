import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'

import InvitationPanelFormContainer from '../containers/panel/InvitationPanelFormContainer'

import { toLocaleDateString } from '../../utils/date'


export default class InvitationPanel extends React.Component {

    constructor(props) {
        super(props)
    }


    componentDidMount(){

        this.props.listInvitationEmail(this.props.params.job)
    }

    render() {

        const jobId = parseInt(this.props.params.job, 10)

        let currentJob = null;

        currentJob = this.props.jobList.jobs.find((job) => {
            return job.id === jobId;
        });

        const { invitationEmailList } = this.props
        let invListResults = null

        if (invitationEmailList.error) {
            invListResults = (
                <tr>
                    <td colSpan="2"><LoadingError /></td>
                </tr>
            )
        }
        else if (invitationEmailList.fetched) {
            if (invitationEmailList.emails.length > 0) {
                invListResults = invitationEmailList.emails.map((email) => {
                    return (
                        <tr key={email.id}>
                            <td> {email.email } </td>
                            <td> {toLocaleDateString(email.created)} </td>
                        </tr>
                    )
                })
            }
            else {
                invListResults = (
                    <tr>
                        <td colSpan="2">Aucun résultat</td>
                    </tr>
                )
            }
        }
        else {
            invListResults = (
                <tr>
                    <td colSpan="2"><Loader /></td>
                </tr>
            )
        }


        return (
            <div>
                <SlidingPane
                    className='slidePanel slidePanel-right slidePanel-show'
                    isOpen={true}
                    onRequestClose={() => {this.props.router.goBack()}}>
                        <div>
                            <header className="slidePanel-header bg-purple-600 p-r-15">
                              <div className="slidePanel-actions" aria-label="actions" role="group">
                                <button type="button" className="btn btn-pure btn-inverse slidePanel-close actions-top icon wb-close" aria-hidden="true"onClick={() => this.props.router.goBack()}></button>
                              </div>
                              <h1>  { currentJob && currentJob.title}</h1>
                            </header>
                            <div className="slidePanel-inner">
                              <section className="slidePanel-inner-section">

                                <div className="line-chart">
                                  <div className="chart-header">

                                    <h3 className="blue-grey-700 font-size-18 text-xs-center">Ajoutez les adresses emails des candidats que vous souhaitez inviter à passer le pré-entretien</h3>

                                    <InvitationPanelFormContainer job={this.props.params.job}/>

                                    <div className="col-md-12 col-xs-12">
                                      <table className="table">
                                          <thead>
                                            <tr>
                                              <th>Email invoyé</th>
                                              <th>Date</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {invListResults}
                                          </tbody>
                                        </table>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                        </div>
                </SlidingPane>
            </div>
        )
    }
}
