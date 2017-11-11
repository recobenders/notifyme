import React, { Component } from 'react';
import InfoContainer from "../../containers/InfoContainer";
import NotifyContainer from "../../containers/NotifyContainer";

class Item extends Component {

    render() {
        return (
            <div>
                <h2>Info view</h2>
                <InfoContainer />
                <NotifyContainer/>
            </div>
        );
    }
}

export default Item;