import React from 'react'

export default class JobPublishForm extends React.Component {
    componentDidMount() {
        this.props.retrieveJob(this.props.params.id)
    }

    render() {
        const { publishJob } = this.props
        const { pending } = this.props.job

        let isCreatingProcess = false
        if (this.props.location.state !== undefined) {
            isCreatingProcess = this.props.location.state.hasOwnProperty('creatingProcess')
        }

        let btnPublish = null
        if (pending) {
            btnPublish = <button className="btn btn-default"><span className="loader loader-circle" /></button>
        }
        else {
            btnPublish = <button className="btn btn-default" onClick={() => publishJob(this.props.params.id)}>Publier</button>
        }

        return (
            <div className="page-content container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        {isCreatingProcess &&
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="pearls row">
                                        <div className="pearl col-xs-4 done" aria-expanded="true">
                                            <div className="pearl-icon">
                                                <i className="icon wb-clipboard" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Offre</span>
                                        </div>
                                        <div className="pearl col-xs-4 done" aria-expanded="false">
                                            <div className="pearl-icon">
                                                <i className="icon wb-help" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Question</span>
                                        </div>
                                        <div className="pearl col-xs-4 current" aria-expanded="false">
                                            <div className="pearl-icon">
                                                <i className="icon wb-payment" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Paiement</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="panel">
                            <div className="panel-body">
                                <div className="pricing-table">
                                    <div className="pricing-column-four">
                                        <div className="pricing-header">
                                            <div className="pricing-price">
                                                <span className="pricing-currency">$</span>
                                                <span className="pricing-amount">40</span>
                                                <span className="pricing-period">/ mo</span>
                                            </div>
                                            <div className="pricing-title">Standard</div>
                                        </div>
                                        <ul className="pricing-features">
                                            <li>
                                                <strong>10GB</strong> of Lorem ipsum
                                            </li>
                                            <li>
                                                <strong>200MB</strong> Max File Size
                                            </li>
                                            <li>
                                                <strong>2GHZ</strong> CPU
                                            </li>
                                            <li>
                                                <strong>256MB</strong> Memory
                                            </li>
                                            <li>
                                                <strong>1 GB</strong> Storage
                                            </li>
                                        </ul>
                                        <div className="pricing-footer">
                                            <a className="btn btn-primary btn-outline" role="button">
                                                <i className="icon wb-arrow-right font-size-16 margin-right-15" aria-hidden="true"></i>Add to card
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pricing-column-four featured">
                                        <div className="pricing-header">
                                            <div className="pricing-price">
                                                <span className="pricing-currency">$</span>
                                                <span className="pricing-amount">50</span>
                                                <span className="pricing-period">/ mo</span>
                                            </div>
                                            <div className="pricing-title">Premium</div>
                                        </div>
                                        <ul className="pricing-features">
                                            <li>
                                                <strong>10GB</strong> of Lorem ipsum
                                            </li>
                                            <li>
                                                <strong>200MB</strong> Max File Size
                                            </li>
                                            <li>
                                                <strong>2GHZ</strong> CPU
                                            </li>
                                            <li>
                                                <strong>256MB</strong> Memory
                                            </li>
                                            <li>
                                                <strong>2 GB</strong> Storage
                                            </li>
                                        </ul>
                                        <div className="pricing-footer">
                                            <a className="btn btn-primary btn-outline" role="button">
                                                <i className="icon wb-arrow-right font-size-16 margin-right-15" aria-hidden="true"></i>Add to card
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pricing-column-four">
                                        <div className="pricing-header">
                                            <div className="pricing-price">
                                                <span className="pricing-currency">$</span>
                                                <span className="pricing-amount">60</span>
                                                <span className="pricing-period">/ mo</span>
                                            </div>
                                            <div className="pricing-title">Professional</div>
                                        </div>
                                        <ul className="pricing-features">
                                            <li>
                                                <strong>10GB</strong> of Lorem ipsum
                                            </li>
                                            <li>
                                                <strong>200MB</strong> Max File Size
                                            </li>
                                            <li>
                                                <strong>2GHZ</strong> CPU
                                            </li>
                                            <li>
                                                <strong>256MB</strong> Memory
                                            </li>
                                            <li>
                                                <strong>4 GB</strong> Storage
                                            </li>
                                        </ul>
                                        <div className="pricing-footer">
                                            <a className="btn btn-primary btn-outline" role="button">
                                                <i className="icon wb-arrow-right font-size-16 margin-right-15" aria-hidden="true"></i>Add to card
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pricing-column-four">
                                        <div className="pricing-header">
                                            <div className="pricing-price">
                                                <span className="pricing-currency">$</span>
                                                <span className="pricing-amount">70</span>
                                                <span className="pricing-period">/ mo</span>
                                            </div>
                                            <div className="pricing-title">Flagship</div>
                                        </div>
                                        <ul className="pricing-features">
                                            <li>
                                                <strong>10GB</strong> of Lorem ipsum
                                            </li>
                                            <li>
                                                <strong>200MB</strong> Max File Size
                                            </li>
                                            <li>
                                                <strong>2GHZ</strong> CPU
                                            </li>
                                            <li>
                                                <strong>256MB</strong> Memory
                                            </li>
                                            <li>
                                                <strong>8 GB</strong> Storage
                                            </li>
                                        </ul>
                                        <div className="pricing-footer">
                                            <a className="btn btn-primary btn-outline" role="button">
                                                <i className="icon wb-arrow-right font-size-16 margin-right-15" aria-hidden="true"></i>Add to card
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <p>{btnPublish}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
