import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { assign, camelCase, isEmpty, omitBy, reduce, snakeCase } from '../utils/lodash';
import { Form, Result, Spinner } from '../components';
import { fetchResultsIfNeeded, requestFormOptions } from '../actions';
import './App.scss';
import { SubmissionError } from 'redux-form';
import { MexicoResult, CanadaResult } from '../components/Result/StaticResult';

class App extends Component {
  componentDidMount() {
    const { dispatch, query } = this.props;
    dispatch(requestFormOptions());
    dispatch(fetchResultsIfNeeded(query));
  }

  handlePaging = (e) => {
    e.preventDefault();
    if (!e.target.dataset.page) return;

    const { dispatch, query } = this.props;
    const offset = (parseInt(e.target.dataset.page, 10) - 1) * 10;
    const params = assign({}, omitBy(query, isEmpty), { offset });
    dispatch(fetchResultsIfNeeded(params));
    this.push(params);
  }

  handleSubmit = (form) => {
    const error = {};
    if(!form.tradeFlow)
      error.tradeFlow = 'This field is required.';
    if(!form.countries)
      error.countries = 'This field is required.';
    if(!isEmpty(error))
      throw new SubmissionError(error);

    const params = reduce(omitBy(form, isEmpty), (result, value, _key) => {
      const key = snakeCase(_key);
      return assign(
        result, { [key]: Array.isArray(value) ? value.join(',') : value });
    }, {});
    this.props.dispatch(fetchResultsIfNeeded(params));
    this.push(params);
  }

  push(params) {
    this.props.history.push(`?${stringify(params)}`);
  }

  render() {
    const { query, results, form_options } = this.props;
    const formValues = reduce(
      query,
      (result, value, key) => assign(result, { [camelCase(key)]: value }),
      {});
    let result = <Result results={results} onPaging={this.handlePaging} query={query} />;
    if (query.countries === 'Mexico')
      result = <MexicoResult />;
    else if (query.countries === 'Canada')
      result = <CanadaResult />;
    return (
      <div className="explorer">
        <h1 className="Header-1"><b>Search International Tariff Rates Data</b></h1>
        <p className="DefaultParagraph-1"></p>

        <div className="explorer__content">
          <Form onSubmit={this.handleSubmit} initialValues={formValues} formOptions={form_options} />
          <Spinner active={results.isFetching} />
          {result}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const query = ownProps.history.getCurrentLocation().query;
  const { results, form_options } = state;
  return {
    query,
    results,
    form_options
  };
}

export default connect(mapStateToProps)(App);
