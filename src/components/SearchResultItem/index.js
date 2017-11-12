import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import grey from 'material-ui/colors/grey';
import teal from 'material-ui/colors/teal';
import MovieIcon from 'material-ui-icons/Movie';
import MusicIcon from 'material-ui-icons/LibraryMusic';
import TVIcon from 'material-ui-icons/Tv';
import GameIcon from 'material-ui-icons/VideogameAsset';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
    card: {
        display: 'flex',
        maxHeight: 60,
        '&:hover': {
            backgroundColor: teal[100],
            cursor: 'pointer'
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    inline:{
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        paddingTop: 5,
        paddingLeft: 15,
    },
    cover: {
        width: 60,
        height: 60,
        minWidth: 60
    },
    avatarDiv: {
        width: 35,
        height: 60,
        marginTop: 12.5,
        marginLeft: 15

    },
    chip: {
        margin: theme.spacing.unit,
    },
    svgIcon: {
        color: grey[900],
    },
    avatar: {
        width: 35,
        height: 35,
        backgroundColor: grey[300]
    }
});

class SearchResultItem extends Component {

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

    handleOnClick = () => {
        this.props.history.push({
                pathname: "/item",
                state: {item: this.props.item}
            }
        );
    };

    processImageURL(){
        if(this.props.item.image && this.props.item.image.contentUrl) {
            return(this.props.item.image.contentUrl)
        }
        return 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    }

    render() {
        const { classes, item } = this.props;
        const imageUrl = this.processImageURL();
        return (
            <Card className={classes.card} onClick={this.handleOnClick}>
                <CardMedia
                    className={classes.cover}
                    image={imageUrl}
                    title="Live from space album cover"
                />
                <div className={classes.avatarDiv}>
                    <Avatar className={classes.avatar}>
                        {this.getAvatarIcon(classes, item)}
                    </Avatar>
                </div>
                <div style={{overflow: 'hidden'}}>
                    <CardContent className={classes.content}>
                        <div className={classes.details}>
                            <Typography type="title">{item.name}</Typography>
                            <Typography type="subheading" color="secondary">
                                {item.description}
                            </Typography>
                        </div>

                    </CardContent>
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(withRouter(SearchResultItem));
