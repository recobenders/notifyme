import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class SearchResultItem extends Component {

    handleOnClick = () => {
        this.props.history.push({
                pathname: "/item",
                state: {item: this.props.item}
            }
        );
    };

    render() {
        return (
            <div onClick={this.handleOnClick}>
                {this.props.item.name}
            </div>
        );
    }
}

export default withRouter(SearchResultItem);