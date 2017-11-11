import React, { Component } from 'react';

class InfoContainer extends Component {

    render() {
        const item = this.props.item;
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