import React from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'

import { renderAuthInput, renderAuthCheckbox  } from '../../utils/forms/renderers'
import { isRequired, isEmail, minLength } from '../../utils/forms/validators'

export default class ProCreateForm extends React.Component {
    render() {
        const { handleSubmit, pristine, submitting, created } = this.props

        if (created) {
            return (
                <p>
                    Yo ! Check tes mails pour confirmer ton adresse.
                </p>
            )
        }

        return (
            <div>
                <p>Sign up to find interesting thing</p>
                <form onSubmit={handleSubmit} role="form" autoComplete="off">
                    <div className="col-sm-12 col-xs-12">
                        <Field
                            name="company"
                            component={renderAuthInput}
                            type="text"
                            validate={isRequired}
                            placeholder="Raison sociale" />

                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <Field
                            name="last_name"
                            component={renderAuthInput}
                            type="text"
                            validate={isRequired}
                            placeholder="Nom" />
                        <Field
                            name="first_name"
                            component={renderAuthInput}
                            type="text"
                            validate={isRequired}
                            placeholder="Prénom" />
                        <Field
                            name="position"
                            component={renderAuthInput}
                            type="text"
                            placeholder="Fonction" />
                    </div>

                    <div className="col-sm-6 col-xs-12">
                        <Field
                            name="phone"
                            component={renderAuthInput}
                            type="text"
                            placeholder="Téléphone" />
                        <Field
                            name="email"
                            component={renderAuthInput}
                            type="email"
                            validate={[isRequired, isEmail]}
                            placeholder="Adresse e-mail" />
                        <Field
                            name="password"
                            component={renderAuthInput}
                            type="password"
                            validate={[isRequired, minLength(6)]}
                            placeholder="Mot de passe" />
                    </div>

                    <div className="col-sm-12 col-xs-12">
                        <Field
                            name="cgu"
                            component={renderAuthCheckbox}
                            validate={isRequired}
                            label="Accepter les conditions générales d'utilisation" />
                        <button type="submit" className="btn btn-primary btn-block btn-lg m-t-40 ladda-button" disabled={pristine || submitting}>Inscription</button>
                    </div>

                </form>
                <div className="col-sm-12 col-xs-12">
                <p>
                    Déjà inscrit ? <Link to="/login/">Connexion</Link>
                </p>
                </div>
            </div>
        )
    }
}
