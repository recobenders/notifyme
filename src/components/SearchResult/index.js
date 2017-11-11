import React, { Component } from 'react';
import SearchResultItem from "../../components/SearchResultItem";

class SearchResult extends Component {

    render() {
        let resultItems = ['Dunkirk', 'Batman', 'Psycho'];
        return (
            <div>
                Search Results:
                {
                    resultItems.map((item, index) => {
                        return <SearchResultItem item={item} key={index}/>;
                    })
                }
            </div>
        );
    }
}

export default SearchResult;