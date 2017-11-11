import React, { Component } from 'react';
import SearchBox from "../../SearchBox";
import SearchResult from "../../SearchResult";

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResults: [] };
    }

    handleResultUpdate = (results) => {
        this.setState({ searchResults: results });
    };

    render() {
        return (
            <div>
                <SearchBox handleResultUpdate={this.handleResultUpdate}/>
                <SearchResult searchResults={this.state.searchResults}/>
            </div>
        );
    }
}

export default SearchContainer;