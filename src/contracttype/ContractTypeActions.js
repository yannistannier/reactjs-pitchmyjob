import request from '../utils/request'

import { LIST_CONTRACT_TYPE } from './ContractTypeConstants'

export const listContractType = () => {
    return {
        type: LIST_CONTRACT_TYPE,
        payload: request.get('/contracttypes/')
    }
}
