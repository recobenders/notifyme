import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer";

class Landing extends Component {

    handleSearchSubmit = (items) => {
        this.props.history.push({
                pathname: "/item-list",
                state: {items: items}
            }
        );
    };

    render() {
        return (
            <div>
                <h2>Landing view</h2>
                <SearchContainer handleSearchSubmit={this.handleSearchSubmit} />
            </div>
        );
    }
}

export default Landing;