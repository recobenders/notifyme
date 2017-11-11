import React, { Component } from 'react';
import InfoContainer from '../containers/InfoContainer'

class ItemPreview extends Component {

    render() {
        const item = this.props.item;
        return (
            <div>
                <InfoContainer item={item} />
            </div>
        );
    }
}

export default ItemPreview;