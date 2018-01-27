import React from 'react'
import { Field } from 'redux-form'

import { renderTextarea } from '../../../utils/forms/renderers'
import { isRequired } from '../../../utils/forms/validators'

export default class CandidacyPanelCommentsForm extends React.Component {
    render() {
        const { handleSubmit, pristine, submitting } = this.props

        return (
            <div className="media-body">
                <div className="comment-body">
                    <form onSubmit={handleSubmit} className="comment-reply m-t-5" role="form" autoComplete="off">
                        <Field
                            name="message"
                            component={renderTextarea}
                            validate={isRequired}
                            label="Commentaire" />
                            <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Répondre</button>
                    </form>
                </div>
            </div>
        )
    }
}
