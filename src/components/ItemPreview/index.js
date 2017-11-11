import React, { Component } from 'react';

class ItemPreview extends Component {

    render() {
        const itemPreview = this.props;
        return (
            <div>
                {itemPreview.item.name} with release date: {itemPreview.item.release}
            </div>
        );
    }
}

export default ItemPreview;