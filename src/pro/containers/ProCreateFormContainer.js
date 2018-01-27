import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import ProCreateForm from '../components/ProCreateForm'
import { createPro } from '../ProActions'
import { handleFormErrors  } from '../../utils/forms/formatters'
import { asyncValidateEmailNotExists  } from '../../utils/forms/validators'

const mapStateToProps = (state) => {
    return {
        created: state.pro.created,
    }
}

const config = {
    form: 'ProCreateForm',
    onSubmit: (values, dispatch, props) => {
        return dispatch(createPro(values))
            .catch((error) => {
                handleFormErrors(error.response)
            })
    },
    asyncValidate: asyncValidateEmailNotExists,
    asyncBlurFields: ['email'],
}

export default connect(mapStateToProps, null)(reduxForm(config)(ProCreateForm))
