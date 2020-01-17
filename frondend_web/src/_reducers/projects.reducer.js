import { projectConstants } from '../_constants';

export function projects(state = {}, action) {
  switch (action.type) {
    case projectConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case projectConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case projectConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}