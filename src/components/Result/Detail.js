import React, { PropTypes } from 'react';
import { AddressList, IdentificationList, Link, Row, UnorderedList } from './DetailItem';

const Detail = ({ result }) => (
  <table className="explorer__result-item__detail">
    <tbody>
      <Row label="Source">{result.source}</Row>
      <Row label="Start Date">{result.start_date}</Row>
      <Row label="End Date">{result.end_date}</Row>
      <Row label="Entity Number">{result.entity_number}</Row>
      <Row label="Type">{result.type}</Row>
      <Row label="Title">{result.title}</Row>
      <Row label="Federal Register Notice">{result.federal_register_notice}</Row>
      <Row label="Name">{result.name}</Row>
      <Row label="Standard Order">{result.standard_order}</Row>
      <Row label="License Requirement">{result.license_requirement}</Row>
      <Row label="License Policy">{result.license_policy}</Row>
      <Row label="Call Sign">{result.call_sign}</Row>
      <Row label="Vessel Type">{result.vessel_type}</Row>
      <Row label="Gross Tonnage">{result.gross_tonnage}</Row>
      <Row label="Gross Registered Tonnage">{result.gross_registered_tonnage}</Row>
      <Row label="Vessel Flag">{result.vessel_flag}</Row>
      <Row label="Vessel Owner">{result.vessel_owner}</Row>
      <Row label="Remarks">{result.remarks}</Row>
      <Row label="Score">{result.score}</Row>
      <Row label="Source List URL">
        <Link value={result.source_list_url} />
      </Row>
      <Row label="Source Information URL">
        <Link value={result.source_information_url} />
      </Row>
      <Row label="Programs">
        <UnorderedList value={result.programs} />
      </Row>
      <Row label="Alternative Names">
        <UnorderedList value={result.alt_names} />
      </Row>
      <Row label="Nationalities">
        <UnorderedList value={result.nationalities} />
      </Row>
      <Row label="Citizenships">
        <UnorderedList value={result.citizenships} />
      </Row>
      <Row label="Dates of Birth">
        <UnorderedList value={result.dates_of_birth} />
      </Row>
      <Row label="Places of Birth">
        <UnorderedList value={result.places_of_birth} />
      </Row>
      <Row label="Addresses">
        <AddressList value={result.addresses} />
      </Row>
      <Row label="Identifications">
        <IdentificationList value={result.identifications} />
      </Row>
      <Row label="IDs">
        <IdentificationList value={result.ids} />
      </Row>
    </tbody>
  </table>
);
Detail.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Detail;
