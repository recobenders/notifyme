import React, { Component } from 'react';
import ItemPreview from "../../ItemPreview/index";

class ItemPreviewListContainer extends Component {
    render() {
        let items = this.props.items;
        return (
            <div>
                ItemList:
                {
                    items.map((item, index) => {
                        return <ItemPreview item={item} key={index}/>;
                    })
                }
            </div>
        );
    }
}

export default ItemPreviewListContainer;