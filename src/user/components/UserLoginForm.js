import React from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'

import { renderAuthInput  } from '../../utils/forms/renderers'
import { isRequired, isEmail, minLength } from '../../utils/forms/validators'

export default class UserLoginForm extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render() {
        const { handleSubmit, submitting, error } = this.props

        return (
            <div>
                <p>Sign in to find interesting thing</p>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit} role="form" autoComplete="off">
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
                    <div className="form-group clearfix">
                        <Link className="pull-xs-right" to="/forget-password-request/">Mot de passe oublié ?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-lg m-t-40 ladda-button" disabled={submitting}>Connexion</button>
                </form>
                <p>
                    Pas de compte ? <Link to="/register/">Inscrivez-vous</Link>
                </p>
            </div>
        )
    }
}
