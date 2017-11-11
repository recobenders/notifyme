import React, { Component } from 'react';
import ItemPreview from "../../ItemPreview/index";

class ItemPreviewListContainer extends Component {
    render() {
        let items = [{name: 'Dunkirk', release: '1.5.2017'}, {name: 'Sg. Pepper', release: '16.3.1969'}, {name: 'Monopoly', release: '1.1.1987'}];

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