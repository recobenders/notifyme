import React, { Component } from 'react';

class SearchResultItem extends Component {

    render() {
        return (
            <div>
                {this.props.item}
            </div>
        );
    }
}

export default SearchResultItem;