import React from 'react'
import { Field } from 'redux-form'

import { renderTextarea } from '../../utils/forms/renderers'
import { isRequired } from '../../utils/forms/validators'

export default class JobForm extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.listJobQuestion(this.props.params.jobId).then((response) => {
            this.props.initialize(response.value.data[0])
        })
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props


        let isCreatingProcess = false
        if (this.props.location.state !== undefined) {
            isCreatingProcess = this.props.location.state.hasOwnProperty('creatingProcess')
        }

        const labelForm = isCreatingProcess ? 'Suivant' : 'Modifier'

        return (
            <div className="page-content container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        {isCreatingProcess &&
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="pearls row">
                                        <div className="pearl col-xs-4 done" aria-expanded="true">
                                            <div className="pearl-icon">
                                                <i className="icon wb-clipboard" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Offre</span>
                                        </div>
                                        <div className="pearl col-xs-4 current" aria-expanded="false">
                                            <div className="pearl-icon">
                                                <i className="icon wb-help" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Question</span>
                                        </div>
                                        <div className="pearl col-xs-4 disabled" aria-expanded="false">
                                            <div className="pearl-icon">
                                                <i className="icon wb-payment" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Paiement</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Question de l'offre</h3>
                            </div>
                            <div className="panel-body container-fluid">
                                <form onSubmit={handleSubmit} role="form" autoComplete="off">
                                    <Field
                                        name="question"
                                        component={renderTextarea}
                                        validate={isRequired}
                                        label="Question" />
                                    <button type="submit" className="btn btn-primary btn-block" disabled={pristine || submitting}>{labelForm}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
