import React from 'react'

export default class LayoutNotLogged extends React.Component {
    render() {
        return (
            <div className="page-login-v3 layout-full">
                <div className="page vertical-align text-xs-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
                    <div className="page-content vertical-align-middle animation-slide-top animation-duration-1">
                        <div className="panel">
                            <div className="panel-body">
                                <div className="brand">
                                    <img className="brand-img" src="https://s3-eu-west-1.amazonaws.com/spitchapp-dev/harvey/static/base/assets/images/logo-blue.png" alt="..." />
                                    <h2 className="brand-text font-size-18">Spitch</h2>
                                </div>
                                {this.props.children}
                            </div>
                        </div>
                        <footer className="page-copyright page-copyright-inverse">
                            <p>WEBSITE BY Spitch</p>
                            <p>© 2016. All RIGHT RESERVED.</p>
                            <div className="social">
                                <a className="btn btn-icon btn-pure">
                                    <i className="icon bd-twitter" aria-hidden="true"></i>
                                </a>
                                <a className="btn btn-icon btn-pure">
                                    <i className="icon bd-facebook" aria-hidden="true"></i>
                                </a>
                                <a className="btn btn-icon btn-pure" >
                                    <i className="icon bd-google-plus" aria-hidden="true"></i>
                                </a>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}
