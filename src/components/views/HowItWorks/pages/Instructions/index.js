import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
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

class Instructions extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={40} justify="center">
                    <Grid item xs={7}>
                        <Video autoPlay loop muted
                               controls={['PlayPause', 'Seek', 'Time']} >
                            <source src="/search.mp4" type="video/mp4" />
                        </Video>
                    </Grid>
                    <Grid item xs={7}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography type="headline" component="h2">
                                    How to use Notify Me
                                </Typography>
                                <Typography component="p">
                                    1. Search for an upcoming movie, TV show, video game or music album by typing in the search box.
                                </Typography>
                                <Typography component="p">
                                    2. Clicking one of the suggested items and open Item detail.
                                </Typography>
                                <Typography component="p">
                                    3. Choose one of the publication dates.
                                </Typography>
                                <Typography component="p">
                                    4. Add a notification to your calendar.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Instructions);
