import React, { PropTypes } from 'react';
import { AddressList, IdentificationList, Link, Row, ResultTable } from './DetailItem';

const Detail = ({ result }) => (
  <table className="explorer__result-item__detail">
    <tbody>
      <Row label="HS Code">{result.tariff_line}</Row>

      <Row label="Description">{result.subheading_description}</Row>

      <Row label="Staging Basket">{result.staging_basket}</Row>

      <Row label="Rule of Origin">{result.rule_text}</Row>

      <Row label="Zero Duty As of">{result.final_year}</Row>

      <Row label="Base Rate">{result.base_rate}</Row>

      <Row label="Annual Rates">
        <ResultTable value={result.annual_rates} />
      </Row>
    </tbody>
  </table>
);
Detail.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Detail;
