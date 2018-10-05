import React, { PropTypes } from 'react';
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

const ResultTable = ({ headers, entries }) => {
  if (isEmpty(entries)) return null;
  const headerCells = headers.map(header => <th key={header}>{header}</th>);
  const orderedItems = map(entries, (v, k) => [k, v]).sort();
  const items = compact(map(orderedItems, arr => (
    <Row key={arr[0]} label={arr[0].replace('y', '')}>{truncateDecimalPlace(arr[1])}</Row>
  )));

  return <table className="explorer__result-item-table"><thead><tr>{headerCells}</tr></thead><tbody>{items}</tbody></table>;
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
