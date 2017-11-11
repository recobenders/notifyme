import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
// import SmartCrop from 'smartcrop';
import Jimp from 'jimp';

class InfoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageSrc: 'default'
        }
    }

    componentDidMount() {
        if(this.props.item.image && this.props.item.image.contentUrl) {
            let context = this;
            Jimp.read(this.props.item.image.contentUrl).then(function (image) {
                console.log(context.state);
                image.resize(300, Jimp.AUTO).getBase64(Jimp.AUTO, function (err, buffer) {
                    context.setState({
                        imageSrc: buffer.toString('base64')
                    });
                    return buffer.toString('base64');
                });
                // SmartCrop.crop(image, {width: 100, height: 100}).then(function(result){
                //     console.log(result);
                // });
            }).catch(function (err) {
                console.error(err);
            });
        }
    }

    render() {
        const item = this.props.item;
        const description = item.description  || 'N/A';
        const detailedDescription = (item.detailedDescription === undefined ||
            item.detailedDescription.articleBody === undefined ) ? 'N/A' : item.detailedDescription.articleBody;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <img
                            src={this.state.imageSrc}
                            alt={item.name.replace(/&amp;/g, '&')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <p>
                            Name: {item.name.replace(/&amp;/g, '&')}
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