import React, { Component } from 'react';
import SmartCrop from 'smartcrop';
import Jimp from 'jimp';
import ItemProperty from '../../ItemProperty';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
});

class InfoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageSrc: null
        }
    }

    componentDidMount() {
        if(this.props.item.image && this.props.item.image.contentUrl) {
            let context = this;

            context.setState({
                imageSrc: this.props.item.image.contentUrl
            });

            Jimp.read(this.props.item.image.contentUrl).then(function (image) {
                image.getBase64(Jimp.AUTO, function (err, buffer) {
                    let img = new Image(image.width, image.height);
                    img.src = buffer.toString('base64');

                    // SmartCrop.crop(img, {width: 300, height: 300}).then(function(result){
                        // var crop = result.topCrop;
                        // let croppedImage = image.extract({width: crop.width, height: crop.height, left: crop.x, top: crop.y}).resize(300, 300);
                        //
                        // croppedImage.getBase64(Jimp.AUTO, function (err, buffer) {
                        //     context.setState({
                        //         imageSrc: buffer.toString('base64')
                        //     });
                        // });
                        // console.log(result);
                    // });

                    return buffer.toString('base64');
                });
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

        const { classes } = this.props;
        let image = null;
        if (this.state.imageSrc) {
            image = <img
                src={this.state.imageSrc}
                alt={item.name.replace(/&amp;/g, '&')}
            />;
        } else {
            image = <CircularProgress className={classes.progress} size={50} />;
        }

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        {image}
                    </Grid>
                    <Grid item xs={6}>
                        <ItemProperty label="Name:" value={item.name}/>
                        <ItemProperty label="Type:" value={item['@type'].join(',') || 'N/A'}/>
                        <ItemProperty label="Description:" value={description}/>
                        <ItemProperty label="Detailed Description:" value={detailedDescription}/>
                        <ItemProperty label="Link:" value={item.url || 'N/A'}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(InfoContainer);