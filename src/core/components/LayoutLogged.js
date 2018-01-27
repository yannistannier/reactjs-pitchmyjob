import React from 'react'

import Loader from './Loader'
import NavBarContainer from '../containers/NavBarContainer'
import SideBarContainer from '../containers/SideBarContainer'

export default class LayoutLogged extends React.Component {
    componentDidMount() {
        this.props.retrieveUserFromToken()
    }

    render() {
        const { fetched } = this.props.currentUser

        if (fetched) {
            return (
                <div className="full-height">
                    <NavBarContainer />
                    <SideBarContainer />
                    <div className="page">

                        {this.props.children}</div>
                </div>
            )
        }

        return <Loader />
    }
}
