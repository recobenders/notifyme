import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ItemProperty from '../../ItemProperty';
import NotifyContainer from '../NotifyContainer';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import { teal, grey } from 'material-ui/colors';
import MovieIcon from 'material-ui-icons/Movie';
import MusicIcon from 'material-ui-icons/LibraryMusic';
import TVIcon from 'material-ui-icons/Tv';
import GameIcon from 'material-ui-icons/VideogameAsset';
import Avatar from 'material-ui/Avatar';

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
    },
    cardHeader: {
        background: teal[100],
    },
    avatar: {
        width: 50,
        height: 50,
        backgroundColor: 'white'
    },
    svgIcon: {
        width: 30,
        height: 30,
        color: grey[900],
    }
});

class InfoContainer extends Component {

    getAvatarIcon = (classes, item) => {
        let mediaType = item['@type'].find(function (el) { return el !== 'Thing' });
        if(mediaType === 'Movie'){
            return <MovieIcon className={classes.svgIcon}/>
        } else if(mediaType === 'TVSeries' || mediaType === 'TVEpisode'){
            return <TVIcon className={classes.svgIcon}/>
        } else if(mediaType === 'MusicAlbum'){
            return <MusicIcon className={classes.svgIcon}/>
        } else if(mediaType === 'VideoGame'){
            return <GameIcon className={classes.svgIcon}/>
        }
    };

    render() {
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
                            className={classes.cardHeader}
                            avatar={
                                <Avatar className={classes.avatar}>
                                    { this.getAvatarIcon(classes, item) }
                                </Avatar>
                            }
                        />
                        {cardMedia}
                        <CardContent>
                            <ItemProperty label="Type:" value={item['@type'].join(', ') || 'N/A'}/>
                            <ItemProperty label="Description:" value={detailedDescription}/>
                            <ItemProperty label="Link:" value={link}/>

                            <Divider className={classes.divider} />

                            <NotifyContainer item={item} releaseDates={this.props.releaseDates} loading={this.props.loading}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(InfoContainer);