import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ItemProperty from '../../ItemProperty';
import NotifyContainer from '../NotifyContainer';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
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
    divider: {
        marginTop: 30,
        marginBottom: 30,
    }
});

class InfoContainer extends Component {

    render() {
        // console.log(this.props);
        const { classes } = this.props;
        const item = this.props.item;
        const description = item.description  || 'N/A';
        const detailedDescription = (item.detailedDescription === undefined ||
            item.detailedDescription.articleBody === undefined ) ? 'N/A' : item.detailedDescription.articleBody;

        let link = null;
        if (item.url) {
            link = <Link to={item.url}>{item.url}</Link>;
        } else {
            link = 'N/A';
        }

        let cardMedia = null;
        if(this.props.item.image && this.props.item.image.contentUrl) {
            cardMedia = <CardMedia
                className={classes.media}
                image={this.props.item.image.contentUrl}
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

                            <Divider className={classes.divider} />

                            <NotifyContainer item={item} releaseDates={this.props.releaseDates}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(InfoContainer);