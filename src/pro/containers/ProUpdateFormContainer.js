import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import ProUpdateForm from '../components/ProUpdateForm'
import { listEmployee } from '../../employee/EmployeeActions'
import { listIndustry } from '../../industry/IndustryActions'
import { retrievePro, updatePro } from '../ProActions'
import { addAlertSuccess } from '../../alert/AlertActions'
import { handleFormErrors  } from '../../utils/forms/formatters'

const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        industry: state.industry,
        pro: state.pro,
        initialValues: state.pro.pro,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listEmployee: () => {
            return dispatch(listEmployee())
        },
        listIndustry: () => {
            return dispatch(listIndustry())
        },
        retrievePro: () => {
            return dispatch(retrievePro())
        },
    }
}

const config = {
    form: 'ProUpdateForm',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
        // TODO: find something to handle file / image upload
        // If logo unchanged, do not pass it to PUT request
        if (values['logo'] === props.pro['pro']['logo']) {
            delete values['logo']
        }

        return dispatch(updatePro(values))
            .then((response) => {
                dispatch(addAlertSuccess('Pro modifié'))
            })
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(config)(ProUpdateForm))
