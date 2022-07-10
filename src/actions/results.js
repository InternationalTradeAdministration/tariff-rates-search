import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_FAILURE } from '../constants';
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

const { host, subscription_key } = config.api.tariff_rates;

function fetchResults(querystring) {
  return (dispatch) => {
    dispatch(requestResults());
    return fetch(`${host}/search?${querystring}`, {
      headers: { 'subscription-key': subscription_key, 'Cache-Control': 'no-cache' }
    })
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
  const new_params = {};
  if(params.trade_flow === 'Importing'){
    new_params.partner_names = params.countries;
    new_params.reporter_names = 'United States';
  }
  else{
    new_params.reporter_names = params.countries;
    new_params.partner_names = 'United States';
  }
  if (params.offset)
    new_params.offset = params.offset;
  if (params.hs_code)
    new_params.hs_code_prefix = params.hs_code;

  return stringify(new_params);
}

export function fetchResultsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState(), params)) {
      return dispatch(fetchResults(processParams(params)));
    }
    return Promise.resolve([]);
  };
}
