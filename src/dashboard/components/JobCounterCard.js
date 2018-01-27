import React from 'react'

export default class JobCounterCard extends React.Component {
    render() {
        const { counter } = this.props

        return (
            <div>
                <div className="col-xxl-4 col-xl-4 col-lg-12 col-xs-12">
                    <div className="card card-block p-10 bg-blue-600">
                        <div className="counter counter-lg counter-inverse">
                            <div className="counter-label text-uppercase">Offres en cours</div>
                            <span className="counter-number">{counter.fetched ? counter.results.visible : '...'}</span>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-12 col-xs-12">
                    <div className="card card-block p-10 bg-purple-600">
                        <div className="counter counter-lg counter-inverse">
                            <div className="counter-label text-uppercase">Offres en attente</div>
                            <span className="counter-number">{counter.fetched ? counter.results.pending : '...'}</span>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-12 col-xs-12">
                    <div className="card card-block p-10 bg-red-600">
                        <div className="counter counter-lg counter-inverse">
                            <div className="counter-label text-uppercase">Offres expirées</div>
                            <span className="counter-number">{counter.fetched ? counter.results.expired : '...'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
