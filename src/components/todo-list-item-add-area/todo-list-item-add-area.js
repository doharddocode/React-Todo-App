import React from "react";

import "./todo-list-item-add-area.css"

export default class addButton extends React.Component {
  state = {
    labelValue: ''
  }

  onLabelValueChange = (event) => {
    this.setState({
      labelValue: event.target.value
    })
  }

  onSubmit = (event) => {
    const labelValue = this.state.labelValue;

    event.preventDefault();
    if (labelValue !== "")
      this.props.onAddItem(this.state.labelValue);
    this.setState({
      labelValue: ''
    })
  }

  render() {
    return (
      <form className="todo-list-add-area" onSubmit={ this.onSubmit }>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Task name</span>
          </div>
          <input
            type="text" className="form-control"
            aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            onChange={ this.onLabelValueChange } placeholder="Type text here..." value={ this.state.labelValue }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary float-right btn-add"
        >+</button>
      </form>
    );
  }
}
