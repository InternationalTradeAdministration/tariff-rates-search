import React, { PropTypes } from 'react';
import Fragment from 'react-dot-fragment';
import { compact, get, isEmpty, map } from '../../utils/lodash';

const isValidChildren = (value) => {
  if (typeof value === 'number' || typeof value === 'boolean') return true;

  if (isEmpty(value)) return false;

  if (typeof value.type === 'function' && isEmpty(get(value, ['props', 'entries']))) return false;

  return true;
};

const truncateDecimalPlace = (value) => {
  if (isEmpty(value)) return null;

  const regex = /^\d+\.\d{1}/;
  const found = value.match(regex);
  return !isEmpty(found) ? found[0] : value;
};

const ResultTable = ({ headers, entries, reporter_name, partner_name, tariff_line }) => {
  if (isEmpty(entries)) return null;
  const headerCells = headers.map(header => <th key={header}>{header}</th>);
  let orderedItems = map(entries, (v, k) => [k, v]).sort();

  if (((reporter_name === "Korea") || (partner_name === "Korea")) && ConsolidatedLines.includes(tariff_line)) {
    orderedItems = orderedItems.slice((orderedItems.filter(item => item.includes("y2020"))), -22); // because we want to chop the next 22 years
  };

  const items = compact(map(orderedItems, arr => (
    <Row key={arr[0]} label={arr[0].replace('y', '')}>{truncateDecimalPlace(arr[1])}</Row>
  )));

  return (
    <table className="explorer__result-item-table">
      <thead><tr>{headerCells}</tr></thead>
      <tbody>
        {items}
        { (((reporter_name === "Korea") || (partner_name === "Korea")) && ConsolidatedLines.includes(tariff_line)) ? (
          <Fragment>
              <tr>
                <td className="explorer__result-field-name">2020 - 2040</td>
                <td className="explorer__result-field-value">{truncateDecimalPlace(entries["y2020"])}</td>
              </tr>
              <tr>
                <td className="explorer__result-field-name">2041</td>
                <td className="explorer__result-field-value">{truncateDecimalPlace(entries["y2041"])}</td>
              </tr>
          </Fragment>
        ) : null }
      </tbody>
    </table>
  );
}

const Row = ({ label, children }) => {
  if (!isValidChildren(children)) return null;

  return (
    <tr>
      <td className="explorer__result-field-name">{label}</td>
      <td className="explorer__result-field-value">{children}</td>
    </tr>
  );
};
Row.propTypes = { label: PropTypes.string.isRequired, children: PropTypes.any };

export {
  Row,
  ResultTable
};

const ConsolidatedLines = [
  "87042100",
  "87042250",
  "87042300",
  "87043100",
  "87043200",
  "87049000",
];