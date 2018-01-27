import React from 'react'
import { Field } from 'redux-form'

import { renderTextarea } from '../../utils/forms/renderers'
import { isRequired } from '../../utils/forms/validators'

export default class ResumePanelContactForm extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props
        const { onClose } = this.props

        return (
            <div className="modal fade modal-fill-in in " id="exampleFillIn" aria-hidden="false" aria-labelledby="exampleFillIn" role="dialog" tabIndex="-1" style={{display: 'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onClose()}>
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="exampleFillInModalTitle">Envoyer un message à Maxmilien</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} role="form" autoComplete="off">
                                <div className="row">
                                    <div className="col-xs-12 col-md-12 ">
                                        <Field
                                            name="message"
                                            component={renderTextarea}
                                            validate={isRequired}
                                            label="" />
                                    </div>
                                    <div className="col-xs-12 col-md-12 ">
                                        <button type="submit" className="btn btn-primary btn-outline pull-xs-right" disabled={pristine || submitting}>Envoyer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
