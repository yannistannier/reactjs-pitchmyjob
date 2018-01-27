import React from 'react'
import { Field } from 'redux-form'

import { renderInput, renderSelectMultiple, renderTextarea } from '../../utils/forms/renderers'
import ImageBase64Field from '../../utils/forms/Fields/ImageBase64Field'
import LocationField from '../../utils/forms/Fields/LocationField'
import { isRequired } from '../../utils/forms/validators'

export default class JobForm extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.listContractType()
        this.props.listExperience()
        this.props.listStudyLevel()

        if (this.props.params.hasOwnProperty('id')) {
            this.props.retrieveJob(this.props.params.id)
        }
        else {
            this.props.retrievePro().then((response) => {
                // Initialize form logo field with pro logo
                this.props.initialize({logo: response.value.data.logo})
            })
        }
    }

    render() {
        const { handleSubmit, pristine, submitting, contractType, experience, studyLevel } = this.props

        const isCreatingProcess = !this.props.params.hasOwnProperty('id')
        const labelForm = isCreatingProcess ? 'Suivant' : 'Modifier'

        return (
            <div className="page-content container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        {isCreatingProcess &&
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="pearls row">
                                        <div className="pearl current col-xs-4" aria-expanded="true">
                                            <div className="pearl-icon">
                                                <i className="icon wb-clipboard" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Offre</span>
                                        </div>
                                        <div className="pearl col-xs-4 disabled" aria-expanded="false">
                                            <div className="pearl-icon">
                                                <i className="icon wb-help" aria-hidden="true"></i>
                                            </div>
                                            <span className="pearl-title">Question</span>
                                        </div>
                                        <div className="pearl col-xs-4 disabled" aria-expanded="false">
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
                            <div className="panel-heading">
                                <h3 className="panel-title">Information sur l'offre</h3>
                            </div>
                            <div className="panel-body container-fluid">
                                <form onSubmit={handleSubmit} role="form" autoComplete="off">
                                    <Field
                                        name="logo"
                                        component={ImageBase64Field}
                                        validate={isRequired}
                                        label="Logo" />
                                    <Field
                                        name="title"
                                        component={renderInput}
                                        type="text"
                                        validate={isRequired}
                                        label="Titre de l'offre" />
                                    <Field
                                        name="address"
                                        component={LocationField}
                                        validate={isRequired}
                                        label="Lieu" />
                                    <Field
                                        name="starting_date"
                                        component={renderInput}
                                        type="text"
                                        validate={isRequired}
                                        label="Date de début" />
                                    <Field
                                        name="contract_types"
                                        component={renderSelectMultiple}
                                        options={contractType.contractTypes}
                                        validate={isRequired}
                                        label="Contrat(s)" />
                                    <Field
                                        name="experiences"
                                        component={renderSelectMultiple}
                                        options={experience.experiences}
                                        validate={isRequired}
                                        label="Expérience(s)" />
                                    <Field
                                        name="study_levels"
                                        component={renderSelectMultiple}
                                        options={studyLevel.studyLevels}
                                        validate={isRequired}
                                        label="Niveau d'études" />
                                    <Field
                                        name="salary"
                                        component={renderInput}
                                        type="text"
                                        validate={isRequired}
                                        label="Salaire" />
                                    <Field
                                        name="skills"
                                        component={renderInput}
                                        type="text"
                                        validate={isRequired}
                                        label="Compétence(s) recherchée(s)" />
                                    <Field
                                        name="description"
                                        component={renderTextarea}
                                        validate={isRequired}
                                        label="Description" />
                                    <button type="submit" className="btn btn-primary btn-block" disabled={pristine || submitting}>{labelForm}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
