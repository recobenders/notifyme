import React, { Component } from 'react';
import SearchResultItem from "../../components/SearchResultItem";

class SearchResult extends Component {

    render() {
        const searchResult = this.props;
        return (
            <div>
                Search Results:
                {
                    searchResult.searchResults.map((item, index) => {
                        return <SearchResultItem item={item} key={index}/>;
                    })
                }
            </div>
        );
    }
}

export default SearchResult;