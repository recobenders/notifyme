import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

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
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        { imageUrl &&
                        <img src={imageUrl} alt={item.name} />
                        }
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default InfoContainer;