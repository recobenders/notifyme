import React, { Component } from 'react';

class InfoContainer extends Component {

    render() {
        const item = this.props.item;
        console.log(item);
        return (
            <div>
                <p>
                    Name: {item.name}
                </p>
                <p>
                    Type: {item['@type'].join(',')}
                </p>
                <p>
                    Description: {item.description}
                </p>
                <p>
                    Detailed Description: {item.detailedDescription.articleBody}
                </p>
                <p>
                    Link: {item.url}
                </p>
            </div>
        );
    }
}

export default InfoContainer;