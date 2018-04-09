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

const SelectField = ({ description, input, label = 'Untitled', name, options, multi = false, meta: { error } }) => (
  <div className="explorer__form__group">
    <label htmlFor={name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <div>
      <Select
        {...input}
        options={options}
        multi={multi} autoBlur
        simpleValue = {true}
        onBlur={() => input.onBlur(input.value)}
        onChange={(value) => input.onChange(value)}
      />
    </div>
    {(error && <span className="explorer__form__error">{error}</span>)}
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

const RadioGroup = ({input, meta, options}) => {
  const hasError = meta.touched && meta.error;
  return(
    <div>
      {options.map(o => <p key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</p>)}
      {hasError && <span className="explorer__form__error">{meta.error}</span>}
    </div>
  );
}

const Form = ({
  error, handleSubmit, formOptions
}) => (
  <form className="explorer__form" onSubmit={handleSubmit}>
    <fieldset>

      <div className="explorer__form__group">
        <label>Importing or Exporting</label>
          <div className="explorer__form__radio">
             <Field component={RadioGroup} name="tradeFlow" options={[
              { title: 'You are importing goods from an FTA Partner into the United States.', value: 'Importing'},
              { title: 'You are exporting goods from the United States to an FTA partner.', value: 'Exporting'}
             ]} />
          </div>
      </div>

      <Field
        component={SelectField} name="countries" label="FTA Partner Countries" options={formOptions.countries}
        description="Select an FTA Partner Country."
      />
      <Field
        component={TextField} name="hsCode" label="HS Code"
        description="Search by HS Code (or prefix) by entering 1-10 characters.  This field is not requried."
      />
      <p>
      If you do not know your HS code, the <a href="http://uscensus.prod.3ceonline.com/" target="_blank">U.S. Census Bureau’s Schedule B Search Engine</a> can help you determine your HS code by allowing you to search by keyword or product description.   If you are still having trouble finding your products, click <a href="https://2016.export.gov/FTA/ftatarifftool/Help.aspx" target="_blank">here</a> for more information.
      </p>
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

export default reduxForm({
  form: 'form',
})(Form);
