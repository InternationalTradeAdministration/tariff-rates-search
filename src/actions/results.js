import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_FAILURE } from 'constants';
import config from '../config.js';
import { isEmpty } from '../utils/lodash';

export function requestResults() {
  return {
    type: REQUEST_RESULTS,
  };
}

export function receiveResults(payload) {
  return {
    type: RECEIVE_RESULTS,
    payload,
  };
}

export function receiveFailure(error) {
  return {
    type: RECEIVE_FAILURE,
    error,
  };
}

const { host, apiKey } = config.api.tariff_rates;

function fetchResults(querystring) {
  return (dispatch) => {
    dispatch(requestResults());
    return fetch(`${host}?api_key=${apiKey}&${querystring}`)
      .then(response => response.json())
      .then(json => dispatch(receiveResults(json)));
  };
}

function shouldFetchResults(state, params) {
  const { results } = state;
  if (!results) {
    return true;
  } else if (results.isFetching || isEmpty(params) || params.countries === 'Canada' || params.countries === 'Mexico'){
    return false;
  }
  return true;
}

function processParams(params) {
  const new_params = { sort: 'tariff_line:asc'};
  if(params.trade_flow === 'Importing'){
    new_params.partner_agreement_names = params.countries;
    new_params.reporter_agreement_names = 'United States'
  }
  else{
    new_params.reporter_agreement_names = params.countries;
    new_params.partner_agreement_names = 'United States'
  }
  if (params.offset)
    new_params.offset = params.offset;
  if (params.hs_code)
    processHSCode(new_params, params.hs_code);
 
  return stringify(new_params);
}

function processHSCode(params, hs_code){
  let hs_field = "tariff_line";
  const length = hs_code.length;
  if (length < 10)
    hs_field = "hs_prefix_" + length;
  params[hs_field] = hs_code;
}

export function fetchResultsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState(), params)) {
      return dispatch(fetchResults(processParams(params)));
    }
    return Promise.resolve([]);
  };
}
