import React, { useState, Component } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";

export default class FindStock extends React.Component {
  state = {
    stocks: [],
  };

  componentDidMount() {
    API.findStock().then((res) => {
      console.log(res);
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.findStock(this.state.stocks);
  };

  render() {
    return (
      <div>
        {/* <ul className="list-group">
          <li className="list-group-item">{this.state}</li>
        </ul>
        <SearchForm handleFormSubmit={this.handleFormSubmit} /> */}
      </div>
    );
  }
}
