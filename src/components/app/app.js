import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ToDoList from "../todo-list";
import TodoListItemAddArea from "../todo-list-item-add-area";
import "./app.css"

export default class App extends React.Component {
  maxIdx = 0;

  createTodoItem = (label) => {
    return ({
      label: label,
      important: false,
      done: false,
      id: this.maxIdx++
    });
  };

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have A Lunch')
    ],
    term: "",
    currentFilter: "all"
  };

  addItem = (labelValue) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(labelValue);
      const newData = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newData
      }
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  toggleProperty = (id, propertyName, todoData) => {
    const oldItem = todoData[id];
    const newItem = {
      ...oldItem,
      [propertyName]: !oldItem[propertyName]
    }

    return [
      ...todoData.slice(0, id),
      newItem,
      ...todoData.slice(id + 1)
    ];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      return {
        todoData: this.toggleProperty(idx, "done", todoData)
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      return {
        todoData: this.toggleProperty(idx, "important", todoData)
      };
    });
  };

  search(items, term) {
    if (term === "")
      return (items);

    return items.filter((item) => {
      return (item.label.toLocaleLowerCase().indexOf(term.toLowerCase()) > -1);
    })
  };

  onSearchChange = (term) => {
    this.setState({
      term: term
    })
  };

  filter(items) {
    const currentFilter = this.state.currentFilter;

    if (currentFilter === "done")
      return items.filter((item) => item.done)
    else if (currentFilter === "active")
      return items.filter((item) => !item.done)
    else
      return items;
  }

  onFilterChange = (filterValue) => {
    this.setState({
      currentFilter: filterValue
    })
  }

  render() {
    const { todoData, term } = this.state;
    const visibleItems = this.filter(this.search(todoData, term));
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader todo={ todoCount } done={ doneCount }/>
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={ this.onSearchChange }/>
          <ItemStatusFilter
            currentFilter={ this.state.currentFilter }
            onFilterChange={ this.onFilterChange }
          />
        </div>

        <ToDoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />
        <TodoListItemAddArea
          onAddItem={ this.addItem }
        />
      </div>
    );
  }
}
