import React from 'react'
import { Field } from 'redux-form'

import { renderAuthInput  } from '../../utils/forms/renderers'
import { isRequired, isEmail } from '../../utils/forms/validators'

export default class UserForgetPasswordRequestForm extends React.Component {
    render() {
        const { handleSubmit, pristine, submitting, forgetPasswordRequested, error } = this.props

        if (forgetPasswordRequested) {
            return (
                <p>
                    Yo ! Check tes mails pour avoir le lien de réinitialisation.
                </p>
            )
        }

        return (
            <div>
                <p>Mot de passe oublié</p>
                {error && <p className="text-danger">Aucun compte lié à cette adresse e-mail n'à pu être trouvé</p>}
                <form onSubmit={handleSubmit} role="form" autoComplete="off">
                    <Field
                        name="email"
                        component={renderAuthInput}
                        type="email"
                        validate={[isRequired, isEmail]}
                        placeholder="Adresse e-mail" />
                    <button type="submit" className="btn btn-primary btn-block btn-lg m-t-40 ladda-button" disabled={pristine || submitting}>Envoyer</button>
                </form>
            </div>
        )
    }
}
