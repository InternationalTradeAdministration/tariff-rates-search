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

const SelectField = ({ description, input, label = 'Untitled', options, multi = false, meta: { error } }) => (
  <div className="explorer__form__group">
    <div>
      <label htmlFor={input.name}>{label}</label>
      {description ? <p>{description}</p> : null}
      <Select
        {...input}
        id={input.name}
        options={options}
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
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
};

const RadioGroup = ({input, meta, options}) => {
  const hasError = meta.touched && meta.error;
  return(
    <div>
      {options.map(o => <p key={o.value}><input id={o.value} type="radio" {...input} value={o.value} checked={o.value === input.value} /><label htmlFor={o.value}>{o.title}</label></p>)}
      {hasError && <span className="explorer__form__error">{meta.error}</span>}
    </div>
  );
}

class Form extends React.Component {
  constructor(props){
    super(props);
    this.clearForm = this.clearForm.bind(this);
  }

  clearForm() {
    this.props.change('tradeFlow', null);
    this.props.change('countries', null);
    this.props.change('hsCode', null);
  }

  render() {
    const { error, handleSubmit, formOptions } = this.props;
    return (
      <form className="explorer__form" onSubmit={handleSubmit}>
        <h1 className="Header-1"><b>Search FTA Rates</b></h1>
          <fieldset className="explorer__form__group">
            <legend>1.  Are you Importing or Exporting?</legend>
            <div className="explorer__form__radio">
               <Field component={RadioGroup} name="tradeFlow" options={[
                 { title: <span>You are <u>exporting</u> goods from the United States to an FTA partner.</span>, value: 'Exporting'},
                 { title: <span>You are <u>importing</u> goods from an FTA Partner into the United States.</span>, value: 'Importing'}
               ]} />
            </div>
          </fieldset>

          <Field
            component={SelectField} name="countries" label="2. Please select an FTA Partner:" options={formOptions.countries}
            description=""
          />
          <Field
            component={TextField} name="hsCode" label="3. Search by an HS Code:"
            description="If you know your HS code, enter it here (enter 4-10 numeric codes to identify a product)."
          />
          <p>
          If you do not know your HS code, the <a href="https://uscensus.prod.3ceonline.com/" target="_blank">Schedule B Search Engine</a> can help you determine your HS code by allowing you to search by keyword or product description.   If you are still having trouble finding your products, please see <a href="./FAQs" target="_blank">FAQ page</a> for more information.
          </p>
          <div className="explorer__form__group">
            <button className="explorer__form__submit pure-button pure-button-primary" type="submit" onClick={handleSubmit} disabled={!!error}>
              <i className="fa fa-paper-plane" /> Search
            </button>
            <button className="explorer__form__clear pure-button" type="reset" onClick={this.clearForm} >
              Clear
            </button>
          </div>
      </form>
    );
  }
}
Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'form',
})(Form);
