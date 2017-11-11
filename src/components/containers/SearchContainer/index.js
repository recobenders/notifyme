import React, { Component } from 'react';
import SearchBox from "../../SearchBox";
import SearchResult from "../../SearchResult";
import { withRouter } from 'react-router-dom'

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResults: [] };
    }

    handleResultUpdate = (results) => {
        this.setState({ searchResults: results.map((item) => {return item.result}) });
    };

    handleResultSubmit = () => {
        this.props.handleSearchSubmit(this.state.searchResults);
    };

    render() {
        return (
            <div>
                <SearchBox
                    handleResultUpdate={this.handleResultUpdate}
                    handleResultSubmit={this.handleResultSubmit}
                />
                <SearchResult searchResults={this.state.searchResults}/>
            </div>
        );
    }
}

export default withRouter(SearchContainer);