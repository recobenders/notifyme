import React, { Component } from 'react';
import InfoContainer from "../../containers/InfoContainer";
import NotifyContainer from "../../containers/NotifyContainer";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null };
    }

    componentDidMount() {
        if(this.props.location.state == null) return null;
        this.setState({ item: this.props.location.state.item });
    }

    render() {
        const item = this.state.item;
        if(item == null) return null;
        return (
            <div>
                <h2>Item view #{item.name}</h2>
                <InfoContainer item={item}/>
                <NotifyContainer/>
            </div>
        );
    }
}

export default Item;