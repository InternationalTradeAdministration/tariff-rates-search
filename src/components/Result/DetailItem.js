import React, { PropTypes } from 'react';
import Fragment from 'react-dot-fragment';
import { compact, get, isEmpty, map } from '../../utils/lodash';

const isValidChildren = (value) => {
  if (value) {
    console.log('value' + value.type);
  }
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
  let filteredItems = entries
  let y2020 = null
  let y2041 = null

  if (((reporter_name === "Korea") || (partner_name === "Korea")) && ConsolidatedLines.includes(tariff_line)) {
    y2020 = filteredItems.find(e => e.year === 2020);
    y2041 = filteredItems.find(e => e.year === 2041);
    filteredItems = filteredItems.filter((e) => e.year < 2020);
  };

  const items = compact(map(filteredItems, item => (
    <Row key={item.year} label={item.year}>{item.value}</Row>
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
                <td className="explorer__result-field-value">{y2020.value}</td>
              </tr>
              <tr>
                <td className="explorer__result-field-name">2041</td>
                <td className="explorer__result-field-value">{y2041.value}</td>
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
Row.propTypes = { label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]), children: PropTypes.any };

const Links = ({items}) => {
  const filteredItems = items.filter(link => link.link_url && link.link_text);

  return (
      <div>
        {filteredItems.map((link, index) => (
          <p key={index}><a href={link.link_url}>{link.link_text}</a></p>
        ))}
      </div>
  );
};

Links.propTypes = { items: PropTypes.array.isRequired };

export {
  Row,
  ResultTable,
  Links
};

const ConsolidatedLines = [
  "87042100",
  "87042250",
  "87042300",
  "87043100",
  "87043200",
  "87049000",
];
