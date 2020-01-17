import {projectConstants} from '../_constants';
import {projectService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const projectActions = {
    getAll,
};


function getAll() {
    return dispatch => {
        dispatch(request());

        projectService.getAll()
            .then(
                projects => dispatch(success(projects)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() {
        return {type: projectConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: projectConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: projectConstants.GETALL_FAILURE, error}
    }
}
