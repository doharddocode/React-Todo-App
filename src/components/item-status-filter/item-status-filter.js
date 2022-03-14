import React from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends React.Component {
  state = {
    activeTab: ''
  };

  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  render() {
    const { currentFilter, onFilterChange } = this.props
    const buttons = this.buttons.map((btn) => {
      const isActive = currentFilter === btn.name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";

      return (
        <button type="button"
                className={ `btn ${clazz}` }
                key={ btn.name }
                onClick={ () => onFilterChange(btn.name) }
        >
          { btn.label }
        </button>
      );
    });

    return (
      <div className="btn-group">
        { buttons }
      </div>
    );
  }
}
