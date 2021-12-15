import { combineReducers } from 'redux';
import initialState from './initial-state';
import { FETCH_ROOTS, FETCH_ROOTS_FAILURE, FETCH_ROOTS_SUCCESS, FETCH_ROOTSCONTENT,FETCH_ROOTSCONTENT_FAILURE,FETCH_ROOTSCONTENT_SUCCESS } from '../constants';

 const rootReducer =  combineReducers({
	roots: (state = initialState.roots, action) => {
		switch (action.type) {
			case FETCH_ROOTS:
				return { isLoading: true };

			case FETCH_ROOTS_FAILURE:
				return {
					isLoading: false,
					error: action.payload,
				};
			
			case FETCH_ROOTS_SUCCESS:
				return {
					isLoading: false,
					payload: action.payload,
				};
			
			default:
				return state;
		}
	},




	rootcontent: (state = initialState.rootcontent, action) => {
		switch (action.type) {
			case FETCH_ROOTSCONTENT:
				return { isLoading: true };

			case FETCH_ROOTSCONTENT_FAILURE:
				return {
					isLoading: false,
					error: action.content,
				};
			
			case FETCH_ROOTSCONTENT_SUCCESS:
				return {
					isLoading: false,
					content: action.content,
				};
			
			default:
				return state;
		}
	},








});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;