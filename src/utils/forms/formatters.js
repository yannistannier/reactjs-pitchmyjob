import { SubmissionError } from 'redux-form'

export const handleFormErrors = (response, handleNotFound=false) => {
    if (response) {
        let formErrors = {}

        if (response.status === 400) {
            formErrors = response.data.error_description

            if ('non_field_errors' in formErrors) {
                formErrors['_error'] = formErrors['non_field_errors']
                delete formErrors['non_field_errors']
            }
        }
        else if (response.status === 404 && handleNotFound) {
            formErrors['_error'] = response.data.error_description
        }

        if (formErrors) {
            throw new SubmissionError(formErrors)
        }
    }
}
