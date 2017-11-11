import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer/index";
import ItemPreviewListContainer from "../../containers/ItemPreviewListContainer";

class ItemList extends Component {

    render() {
        return (
            <div>
                <SearchContainer />
                <ItemPreviewListContainer/>
            </div>
        );
    }
}

export default ItemList;