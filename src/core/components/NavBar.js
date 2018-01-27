import React from 'react'
import { Link } from 'react-router'

import NotificationNavBar from '../../notification/components/NotificationNavBar'
import MessageNavBar from '../../message/components/MessageNavBar'

export default class NavBar extends React.Component {
    componentDidMount() {
        this.props.listNotification()
        this.props.retrieveCounterNotification()
        this.props.retrieveCounterMessage()
        this.props.listNotificationMessage()
    }

    render() {
        const { marketAsReadNotification, markAsReadMessage } = this.props
        const { currentUser, notificationList, notificationCounter, messageCounter, notificationMessageList } = this.props

        return (
            <nav className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega navbar-inverse" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggler hamburger hamburger-close navbar-toggler-left hided" data-toggle="menubar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="hamburger-bar"></span>
                    </button>
                    <button type="button" className="navbar-toggler collapsed" data-target="#site-navbar-collapse" data-toggle="collapse">
                        <i className="icon wb-more-horizontal" aria-hidden="true"></i>
                    </button>
                    <div className="navbar-brand navbar-brand-center site-gridmenu-toggle">
                        <img className="navbar-brand-logo" src="https://s3-eu-west-1.amazonaws.com/spitchapp-dev/harvey/static/base/assets/images/logo.png" title="Remark" alt="Remark" />
                        <span className="navbar-brand-text hidden-xs-down"> Remark</span>
                    </div>
                    <button type="button" className="navbar-toggler collapsed" data-target="#site-navbar-search" data-toggle="collapse">
                        <span className="sr-only">Toggle Search</span>
                        <i className="icon wb-search" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="navbar-container container-fluid">
                    <div className="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
                        <ul className="nav navbar-toolbar">
                            <li className="nav-item hidden-float" id="toggleMenubar">
                                <a className="nav-link" data-toggle="menubar" href="#" role="button">
                                    <i className="icon hamburger hamburger-arrow-left">
                                        <span className="sr-only">Toggle menubar</span>
                                        <span className="hamburger-bar"></span>
                                    </i>
                                </a>
                            </li>
                            <li className="nav-item hidden-sm-down" id="toggleFullscreen">
                                <a className="nav-link icon icon-fullscreen" data-toggle="fullscreen" href="#" role="button">
                                    <span className="sr-only">Toggle fullscreen</span>
                                </a>
                            </li>
                            <li className="nav-item hidden-float">
                                <a className="nav-link icon wb-search" data-toggle="collapse" href="#" data-target="#site-navbar-search" role="button">
                                    <span className="sr-only">Toggle Search</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
                            <NotificationNavBar
                                notifications={notificationList}
                                counter={notificationCounter}
                                onMarkAsRead={marketAsReadNotification}
                            />
                            <MessageNavBar
                                messages={notificationMessageList}
                                counter={messageCounter}
                                onMarkAsRead={markAsReadMessage}
                            />
                            <li className="nav-item dropdown">
                                <a className="nav-link navbar-avatar" data-toggle="dropdown" href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                    <span className="avatar avatar-online">
                                        <img src={currentUser.photo} alt="..." />
                                        <i></i>
                                    </span>
                                </a>
                                <div className="dropdown-menu" role="menu">
                                    <Link to="/me/edit/" className="dropdown-item" role="menuitem"><i className="icon wb-user" aria-hidden="true"></i> Mon profil</Link>
                                    <a className="dropdown-item" href="#" role="menuitem"><i className="icon wb-payment" aria-hidden="true"></i> Billing</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-search-overlap" id="site-navbar-search">
                        <form role="search">
                            <div className="form-group">
                                <div className="input-search">
                                    <i className="input-search-icon wb-search" aria-hidden="true"></i>
                                    <input type="text" className="form-control" name="site-search" placeholder="Search..." />
                                    <button type="button" className="input-search-close icon wb-close" data-target="#site-navbar-search" data-toggle="collapse" aria-label="Close"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}
