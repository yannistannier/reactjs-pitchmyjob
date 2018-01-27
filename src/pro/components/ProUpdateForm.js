import React from 'react'
import { Field } from 'redux-form'

import Loader from '../../core/components/Loader'
import LoadingError from '../../core/components/LoadingError'
import { renderInput, renderSelect } from '../../utils/forms/renderers'
// import ImageBase64Field from '../../utils/forms/Fields/ImageBase64Field'
import LocationField from '../../utils/forms/Fields/LocationField'
import DraftWysiwyg from '../../utils/forms/Fields/DraftWysiwyg'
import { isRequired } from '../../utils/forms/validators'




export default class ProUpdateForm extends React.Component {
    componentDidMount(){
        this.props.listEmployee()
        this.props.listIndustry()
        this.props.retrievePro()
    }

    render() {
        const { handleSubmit, pristine, submitting, employee, industry } = this.props
        const { fetched, error, pro } = this.props.pro

        if (error) {
            return <LoadingError />
        }
        else if (!fetched) {
            return <Loader />
        }

        return (
            <div className="page-profile-v3">
                <div className="page-content container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-xs-12 masonry-item m-b-30" >
                            <div className="card card-shadow background-bottom">
                                <div className="card-header-transparent cover overlay">
                                  <div className="cover-background h-250" style={{backgroundImage: "url(https://s3-eu-west-1.amazonaws.com/spitchapp-dev/harvey/static/base/assets/images/test/testimage1.jpg)"}}></div>
                                  <div className="overlay-panel overlay-background overlay-bottom">
                                    <div className="row no-space">
                                      <div className="col-sm-6 col-xs-12">
                                        <a className="avatar avatar-lg bg-white pull-xs-left m-r-20 " href="#">
                                          <img src={pro.logo} alt="" />
                                        </a>
                                        <div>
                                          <div className="font-size-20">{pro.company}</div>
                                          <div className="font-size-14"><i className="icon wb-map m-r-10" aria-hidden="true"></i>
                                                <span className="text-break">{pro.address}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-6 col-xs-12">
                                        <div className="row no-space text-xs-center">
                                          <div className="col-xs-4">
                                            <div className="counter counter-inverse">
                                              <div className="counter-label">Followers</div>
                                              <span className="counter-number">6584</span>
                                            </div>
                                          </div>
                                          <div className="col-xs-4">
                                            <div className="counter counter-inverse">
                                              <div className="counter-label">Following</div>
                                              <span className="counter-number">2046</span>
                                            </div>
                                          </div>
                                          <div className="col-xs-4">
                                            <div className="counter counter-inverse">
                                              <div className="counter-label">Tweets</div>
                                              <span className="counter-number">325</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                    </div>
                    <form onSubmit={handleSubmit} role="form" autoComplete="off">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Information entreprise</h3>
                                    </div>
                                    <div className="panel-body container-fluid">
                                        {/*<Field
                                            name="logo"
                                            component={ImageBase64Field}
                                            validate={isRequired}
                                            label="Logo" />*/}
                                        <Field
                                            name="company"
                                            component={renderInput}
                                            type="text"
                                            validate={isRequired}
                                            label="Raison sociale" />
                                        <Field
                                            name="address"
                                            component={LocationField}
                                            validate={isRequired}
                                            label="Adresse"
                                            placeholder="Saisiez l'adresse du siège social" />
                                        <Field
                                            name="website"
                                            component={renderInput}
                                            type="text"
                                            validate={isRequired}
                                            label="Site internet" />
                                        <Field
                                            name="phone"
                                            component={renderInput}
                                            type="text"
                                            validate={isRequired}
                                            label="Téléphone" />
                                        <Field
                                            name="ca"
                                            component={renderInput}
                                            type="text"
                                            validate={isRequired}
                                            label="Chiffre d'affaire" />
                                        <Field
                                            name="employes"
                                            component={renderSelect}
                                            options={employee.employees}
                                            validate={isRequired}
                                            label="Taille de l'entreprise"
                                            placeholder="Choisissez la taille de l'entreprise" />
                                        <Field
                                            name="industry"
                                            component={renderSelect}
                                            options={industry.industries}
                                            validate={isRequired}
                                            label="Secteur d'activité" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Description</h3>
                                    </div>
                                    <div className="panel-body container-fluid">

                                        <Field
                                            name="description"
                                            component={DraftWysiwyg}
                                            validate={isRequired} />


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <button type="submit" className="btn btn-primary btn-block" disabled={pristine || submitting}>Modifier</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
