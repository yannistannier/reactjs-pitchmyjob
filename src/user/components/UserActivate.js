import React from 'react'
import { Link } from 'react-router'

export default class UserActivate extends React.Component {
    componentDidMount() {
        const { email, token } = this.props.params
        this.props.activateUser(email, token)
    }

    render() {
        const { activated, error } = this.props.user

        if (error) {
            return (
                <p className="text-danger">Aucun compte en attente de validation correspondant à cette adresse e-mail et/ou le token est invalide.</p>
            )
        }
        else if (activated) {
            return (
                <p>Votre compte a été activé. Connectez-vous avec vos identfiants sur la <Link to="/login/">page de connexion</Link>.</p>
            )
        }

        return (
            <p>Activation en cours...</p>
        )
    }
}
