import React, { PropTypes } from 'react';
import { Row, ResultTable } from './DetailItem';

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

      <Row label="Base Rate">{result.base_rate}</Row>

      { (result.hide_annual_rates === 'True') ? null : (
        <Row label="Annual Rates">
          <ResultTable headers={['Year', 'Tariff Rate']} entries={result.annual_rates} tariff_line={result.tariff_line} reporter_name={result.reporter_name} partner_name={result.partner_name} />
        </Row>
      ) }

      <Row label="Rule of Origin">
        {result.rule_text && <span>{result.rule_text}</span>}
        {result.link_text && result.link_url && <p><a href={result.link_url}>{result.link_text}</a></p>}
        {result.link_text2 && result.link_url2 && <p><a href={result.link_url2}>{result.link_text2}</a></p>}
        {result.link_text3 && result.link_url3 && <p><a href={result.link_url3}>{result.link_text3}</a></p>}
      </Row>
    </tbody>
  </table>
);
Detail.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Detail;
