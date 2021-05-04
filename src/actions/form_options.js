import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { isEmpty, omit, values, has, map, startCase, compact } from '../utils/lodash';
import { SET_FORM_OPTIONS, REQUEST_FORM_OPTIONS } from '../constants';
import config from '../config.js';
import { receiveFailure } from './results.js';

const { host, access_token } = config.api.tariff_rates;

export function requestOptions() {
  return {
    type: REQUEST_FORM_OPTIONS
  };
}

export function setFormOptions(json){
  const countries = extractOptions(json.aggregations.countries);
  countries.sort(propComparator('value', 'asc'));
  const return_action = {  
    type: SET_FORM_OPTIONS,
    countries: countries,
  };
  return return_action;
}

export function requestFormOptions(){
  return fetchResults();
}

function fetchResults(){
  return (dispatch) => {
    dispatch(requestOptions());
    return fetch(`${host}?size=1`, {
      headers: { 'Authorization': 'Bearer ' + access_token }
    })
        .then(response => response.json())
        .then(json => dispatch(setFormOptions(json)))
        .catch((error) => {
          dispatch(receiveFailure('There was an error connecting to the data source:  ' + error ));
        });
  };
}

function extractOptions(aggregations){
  let options = map(aggregations, obj => { 
    return {label: obj['key'], value: obj['key']};
  });

  return options;
}

function propComparator(prop, order) {
  if (order === 'asc') {
    return function(a, b) {
      if (a[prop] < b[prop])
        return -1;
      if (a[prop] > b[prop])
        return 1;
      return 0;
    };
  }

  else if (order === 'desc') {
    return function(a, b) {
      if (a[prop] > b[prop])
        return -1;
      if (a[prop] < b[prop])
        return 1;
      return 0;
    };
  }
}
