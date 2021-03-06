import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {
  state = {
    term: ""
  }

  onSearchChange = (event) => {
    const term = event.target.value;

    this.setState({
      term: term
    })
    this.props.onSearchChange(term);
  }

  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="Type to search..."
             value={ this.state.term }
             onChange={ this.onSearchChange }
      />
    );
  }
};