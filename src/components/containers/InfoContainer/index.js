import React, { Component } from 'react';
// import SmartCrop from 'smartcrop';
import { Link } from 'react-router-dom'
import Jimp from 'jimp';
import ItemProperty from '../../ItemProperty';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
    card: {
        maxWidth: `100%`,
    },
    media: {
        height: 200,
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
                alt={item.name}
            />;
        } else {
            image = <CircularProgress className={classes.progress} size={50} />;
        }

        let link = null;
        if (item.url) {
            link = <Link to={item.url}>{item.url}</Link>;
        } else {
            link = 'N/A';
        }

        let cardMedia = null;
        if (this.state.imageSrc) {
            cardMedia = <CardMedia
                className={classes.media}
                image={this.state.imageSrc}
                title={item.name}
            />;
        }

        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={item.name}
                            subheader={description}
                        />
                        {cardMedia}
                        <CardContent>
                            <ItemProperty label="Type:" value={item['@type'].join(',') || 'N/A'}/>
                            <ItemProperty label="Description:" value={detailedDescription}/>
                            <ItemProperty label="Link:" value={link}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(InfoContainer);