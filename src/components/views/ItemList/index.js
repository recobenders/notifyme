import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer/index";
import ItemPreviewListContainer from "../../containers/ItemPreviewListContainer";

class ItemList extends Component {

    render() {
        return (
            <div>
                <h2>Item list view</h2>
                <SearchContainer />
                <ItemPreviewListContainer/>
            </div>
        );
    }
}

export default ItemList;