import React, { Component, PropTypes } from 'react';
import Detail from './Detail';

class Item extends Component {
  static propTypes = {
    result: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  state = { expand: false };

  onClick(e) {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  }

  render() {
    const { tariff_line, subheading_description, quota_name, tariff_line_description } = this.props.result;
    const { expand } = this.state;
    const trq = quota_name ? " - " + quota_name : null

    return (
      <div className="explorer__result-item">
        <a href="#" className="explorer__result-item__label" onClick={this.onClick}>
          {tariff_line}{trq}
        </a>
        <p className="outline__right">{subheading_description}</p>
        <p>{tariff_line_description}</p>
        {expand ? <Detail result={this.props.result} /> : null}
      </div>
    );
  }
}

export default Item;
