import React from 'react'
import { Field } from 'redux-form'

import { renderTextarea } from '../../utils/forms/renderers'
import { isRequired } from '../../utils/forms/validators'

export default class MessagePanelForm extends React.Component {
    render() {
        const { handleSubmit, pristine, submitting } = this.props

        return (
            <div className="slidePanel-comment">
                <form onSubmit={handleSubmit} role="form" autoComplete="off">
                    <Field
                        name="message"
                        component={renderTextarea}
                        validate={isRequired}
                        label="" />
                        <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Répondre</button>
                </form>
            </div>
        )
    }
}
