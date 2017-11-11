import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer/index";
import ItemPreviewListContainer from "../../containers/ItemPreviewListContainer";

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.location.state.items
        };
    }

    handleSearchSubmit = (items) => {
        this.setState({
            items: items
        })
    };

    render() {
        return (
            <div>
                <h2>Item list view</h2>
                <SearchContainer
                    handleSearchSubmit={this.handleSearchSubmit}
                    buttonText={'Search'}
                />
                <ItemPreviewListContainer items={this.state.items}/>
            </div>
        );
    }
}

export default ItemList;