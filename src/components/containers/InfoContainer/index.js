import React, { Component } from 'react';

class InfoContainer extends Component {

    render() {
        const item = this.props.item;
        const description = item.description  || 'N/A';
        const detailedDescription = (item.detailedDescription === undefined ||
            item.detailedDescription.articleBody === undefined ) ? 'N/A' : item.detailedDescription.articleBody;
        console.log(item);
        return (
            <div>
                <p>
                    Name: {item.name}
                </p>
                <p>
                    Type: {item['@type'].join(',') || 'N/A'}
                </p>
                <p>
                    Description: {description}
                </p>
                <p>
                    Detailed Description: {detailedDescription}
                </p>
                <p>
                    Link: {item.url || 'N/A'}
                </p>
            </div>
        );
    }
}

export default InfoContainer;