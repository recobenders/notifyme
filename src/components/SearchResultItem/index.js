import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import grey from 'material-ui/colors/grey';
import MovieIcon from 'material-ui-icons/Movie';
import MusicIcon from 'material-ui-icons/LibraryMusic';
import TVShowIcon from 'material-ui-icons/VideoLabel';
import GameIcon from 'material-ui-icons/Games';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
    card: {
        display: 'flex',
        maxHeight: 60,
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
        flex: '1 0 auto',
        paddingTop: 5,
        paddingLeft: 15,
    },
    cover: {
        width: 60,
        height: 60,
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
            return <TVShowIcon className={classes.svgIcon}/>
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

    render() {
        const { classes, item } = this.props;
        console.log(item);
        return (
            <Card className={classes.card} onClick={this.handleOnClick}>
                <CardMedia
                    className={classes.cover}
                    image="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Mac_Miller_Live_from_Space.jpg/220px-Mac_Miller_Live_from_Space.jpg"
                    title="Live from space album cover"
                />
                <div className={classes.avatarDiv}>
                    <Avatar className={classes.avatar}>
                        {this.getAvatarIcon(classes, item)}
                    </Avatar>
                </div>
                <div>
                    <CardContent className={classes.content}>
                        <div className={classes.details}>
                            <Typography type="title">{item.name.replace(/&amp;/g, '&')}</Typography>
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
