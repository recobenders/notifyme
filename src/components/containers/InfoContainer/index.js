import React, { Component } from 'react';

class InfoContainer extends Component {

    render() {
        const item = this.props.item;
        const description = item.description  || 'N/A';
        const detailedDescription = (item.detailedDescription === undefined ||
            item.detailedDescription.articleBody === undefined ) ? 'N/A' : item.detailedDescription.articleBody;
        let imageUrl = null;
        if(item.image) imageUrl = item.image.contentUrl;

        return (
            <div>
                { imageUrl &&
                    <img src={imageUrl} alt={item.name} />
                }
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