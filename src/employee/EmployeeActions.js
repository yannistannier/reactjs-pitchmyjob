import request from '../utils/request'

import { LIST_EMPLOYEE } from './EmployeeConstants'

export const listEmployee = () => {
    return {
        type: LIST_EMPLOYEE,
        payload: request.get('/employees/')
    }
}
