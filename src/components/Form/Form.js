import cx from 'classnames';
import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';
import { isEmpty, map, trim } from '../../utils/lodash';
import tradeFlows from '../../fixtures/trade_flows';
import './Form.scss';

const TextField = ({ description, input, label, meta: { error } }) => (
  <div className={cx('explorer__form__group', { 'explorer__form__group--error': !!error })}>
    <label htmlFor={input.name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <input type="text" className="explorer__form__input" id={input.name} {...input} />
    {(error && <span className="explorer__form__message">{error}</span>)}
  </div>
);
TextField.propTypes = {
  description: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};

const onSelectFn = (onChange) => ({
  false: (value) => onChange(value['value']),
  true:  (values) => onChange(map(values, 'value')),
});
const SelectField = ({ description, input, label = 'Untitled', name, options, multi = false }) => (
  <div className="explorer__form__group">
    <label htmlFor={name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <div>
      <Select
        {...input}
        options={options}
        multi={multi} autoBlur
        onBlur={() => input.onBlur(input.value)}
        onChange={onSelectFn(input.onChange)[multi]}
      />
    </div>
  </div>
);
SelectField.propTypes = {
  description: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
};

const Form = ({
  error, handleSubmit, formOptions
}) => (
  <form className="explorer__form" onSubmit={handleSubmit}>
    <fieldset>
      <Field
        component={SelectField} name="tradeFlow" label="Importing or Exporting" options={tradeFlows}
        description="Search by exports from the US to an FTA Partner, or imports from an FTA Partner to the US."
      />
      <Field
        component={SelectField} name="countries" label="FTA Partner Countries" options={formOptions.countries}
        description="Select an FTA Partner Country."
      />
      <Field
        component={TextField} name="hsCode" label="HS Code"
        description="Search by HS Code or prefix.  This field is not requried."
      />
      <div className="explorer__form__group">
        <button className="explorer__form__submit pure-button pure-button-primary" onClick={handleSubmit} disabled={!!error}>
          <i className="fa fa-paper-plane" /> Search
        </button>
      </div>
    </fieldset>
  </form>
);
Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function validate(values) {
  const errors = {};
  //if (values.fuzzyName === 'true' && isEmpty(trim(values.name))) {
  //  errors.name = 'Name is required.';
  //  errors._error = true;
  //}
  return errors;
}

export default reduxForm({
  form: 'form',
  validate,
})(Form);
