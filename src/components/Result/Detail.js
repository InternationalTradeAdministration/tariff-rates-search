import React, { PropTypes } from 'react';
import { Row, ResultTable, Links } from './DetailItem';

const Detail = ({ result }) => (
  <table className="explorer__result-item__detail">
    <tbody>
      <Row label="HS Code">{result.tariff_line}</Row>

      <Row label="Tariff Line Description">{result.tariff_line_description}</Row>

      <Row label="Description">{result.subheading_description}</Row>

      <Row label="Staging Basket">{result.staging_basket}</Row>

      <Row label="Zero Duty As of">{result.final_year}</Row>

      <Row label="TRQ">{result.quota_name}</Row>

      <Row label="Note">
        {result.tariff_rate_quota_note && <span dangerouslySetInnerHTML={{ __html: result.tariff_rate_quota_note } } />}
      </Row>

      <Row label="Base Rate">{result.base_rate || result.base_rate_alt}</Row>

      { (result.hide_annual_rates === 'True') ? null : (
        <Row label="Annual Rates">
          <ResultTable headers={['Year', 'Tariff Rate']} entries={result.annual_rates} tariff_line={result.tariff_line} reporter_name={result.reporter_name} partner_name={result.partner_name} />
        </Row>
      ) }

      <Row label="Rule of Origin">
        {result.rule_text && <span>{result.rule_text}</span>}
        <Links items={result.links} />
      </Row>
    </tbody>
  </table>
);
Detail.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Detail;
