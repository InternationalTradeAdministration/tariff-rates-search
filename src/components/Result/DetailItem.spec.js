import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Row } from './DetailItem';

describe('<Row />', () => {
  it('render successfully', () => {
    const { label, value } = { label: 'Label #1', value: 'Value #1' };
    const wrapper = shallow(<Row label={label}>{value}</Row>);
    expect(wrapper.contains(
      <tr>
        <td className="explorer__result-field-name">{label}</td>
        <td className="explorer__result-field-value">{value}</td>
      </tr>
    )).toEqual(true);
  });

  context('when value is undefined', () => {
    it('render nothing', () => {
      const { label, value } = { label: 'Nothingness' };
      const wrapper = shallow(<Row label={label}>{value}</Row>);
      expect(wrapper.node).toNotExist();
    });
  });

  context('when value is null', () => {
    it('render nothing', () => {
      const { label, value } = { label: 'Nothingness', value: null };
      const wrapper = shallow(<Row label={label}>{value}</Row>);
      expect(wrapper.node).toNotExist();
    });
  });

  context('when label is undefined', () => {
    it('render without label', () => {
      const { label, value } = { label: undefined, value: 'Value #1' };
      const wrapper = shallow(<Row label={label}>{value}</Row>);
      expect(wrapper.contains(
        <tr>
          <td className="explorer__result-field-name"></td>
          <td className="explorer__result-field-value">Value #1</td>
        </tr>
      )).toEqual(true);
    });
  });
});
