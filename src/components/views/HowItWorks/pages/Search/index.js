import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    card: {
        width: `100%`,
    },
    media: {
        height: 621,
    },
});

class Search extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={40}>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image="/search.png"
                                title="Search"
                            />
                            <CardContent>
                                <Typography type="headline" component="h2">
                                    Search
                                </Typography>
                                <Typography component="p">
                                    Search for an upcoming movie, TV show, video game or music album. Notify ME uses Google Knowledge Graph to allow you to find exactly what you are looking for.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Search);