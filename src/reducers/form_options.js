import { SET_FORM_OPTIONS, REQUEST_FORM_OPTIONS } from '../constants';

export default (state = {
  isFetching: false,
  countries: [],
}, action) => {
  switch (action.type) {
  case REQUEST_FORM_OPTIONS:
    return Object.assign({}, state, {
      isFetching: true
    });
  case SET_FORM_OPTIONS:
    return Object.assign({}, state, {
      isFetching: false,
      countries: action.countries,
    });
  default:
    return state;
  }
}
