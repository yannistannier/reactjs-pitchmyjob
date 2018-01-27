import React from 'react'
import { Link } from 'react-router'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'

export default class ProCard extends React.Component {
    render() {
        const { pro } = this.props

        let proResult = null
        if (pro.error) {
            proResult = <LoadingError />
        }
        else if (pro.fetched) {
            proResult = (
                <div>
                    <div className="avatar avatar-100 m-b-20">
                        <img src={pro.pro.logo} alt="" />
                    </div>
                    <p className="font-size-20 blue-grey-700">{pro.pro.company}</p>
                    <div className="m-b-35" dangerouslySetInnerHTML={{__html: pro.pro.description}}/>
                    <Link to="/company/edit/">
                        <button type="button" className="btn btn-primary p-x-40">Modifier</button>
                    </Link>
                </div>
            )
        }
        else {
            proResult = <Loader />
        }

        return (
            <div className="card card-shadow">
                <div className="card-block text-xs-center bg-white p-40">
                    {proResult}
                </div>
            </div>
        )
    }
}
