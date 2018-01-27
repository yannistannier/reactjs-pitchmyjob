import React from 'react'

export default class Error404 extends React.Component {
    componentWillMount() {
        document.body.classList.add('layout-full')
    }

    render() {
        return (
            <div className="page-error page-error-404">
                <div className="page vertical-align text-xs-center">
                    <div className="page-content vertical-align-middle">
                        <header>
                            <h1 className="animation-slide-top">404</h1>
                            <p>Page non trouvée !</p>
                        </header>
                        <p className="error-advise">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
                        <a className="btn btn-primary btn-round" href="/">Retour à la page d'accueil</a>
                        <footer className="page-copyright">
                            <p>WEBSITE BY amazingSurge</p>
                            <p>© 2017. All RIGHT RESERVED.</p>
                            <div className="social">
                                <a href="#">
                                    <i className="icon bd-twitter" aria-hidden="true"></i>
                                </a>
                                <a href="#">
                                    <i className="icon bd-facebook" aria-hidden="true"></i>
                                </a>
                                <a href="#">
                                    <i className="icon bd-dribbble" aria-hidden="true"></i>
                                </a>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}
