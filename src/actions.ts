import { getRoots, getRoot } from './api';
import {
	FETCH_ROOTS,
	FETCH_ROOTS_FAILURE,
	FETCH_ROOTS_SUCCESS,
	FETCH_ROOTSCONTENT,
	FETCH_ROOTSCONTENT_SUCCESS,
	FETCH_ROOTSCONTENT_FAILURE
} from './constants';

export const fetchRoots = () => (dispatch: any) => {
	dispatch({ type: FETCH_ROOTS });

	const request = getRoots();

	return request.then(
		resp => dispatch({ type: FETCH_ROOTS_SUCCESS, payload: resp }),
		error => dispatch({ type: FETCH_ROOTS_FAILURE, payload: error }),
	);
};

export const fetchTabContent = (event: any) => (dispatch: any) => {
	dispatch({ type: FETCH_ROOTSCONTENT });

	const request = getRoot(event);

	return request.then(
		resp => dispatch({ type: FETCH_ROOTSCONTENT_SUCCESS, content: resp }),
		error => dispatch({ type: FETCH_ROOTSCONTENT_FAILURE, content: error }),
	);
};
