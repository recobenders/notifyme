import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    card: {
        width: `100%`,
    },
    subheader: {
        marginTop: 20,
        marginBottom: 5
    },
    divider: {
        marginTop: 20,
    }
});

class Technologies extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={40} justify="center">
                    <Grid item xs={7}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography type="headline" component="h2">
                                    Motivation
                                </Typography>
                                <Typography component="p">
                                    Our idea was to create a tool that will allow users to store notifications for any upcoming events.
                                    I believe it happens to most of us. You see a trailer to a great new movie and you immediately feel the desire to see the movie as soon as it is published.
                                    But how is one supposed to keep track of all these great future events?
                                    Writing it down? Nah. Manually creating an event in your calendar? Hell no, we are programmers.
                                    That's why we decided to make it as simple as possible.
                                    You go to our website, search your desired item, click a button to add it to your calendar and ... BOOM. You are done.
                                </Typography>
                                <Typography component="p">
                                    The first question that popped up in our minds was: 'Where to get this kind of data?'.
                                    The only logical answer to that question seemed tobe Wikidata.
                                    As we later found out Wikidata doesn't really store as many publication dates as we hoped it will.
                                    That's why we decided to focus on a few specific domains.
                                    These domains are movies, TV shows, video games and music albums.
                                </Typography>
                                <Typography component="p">
                                    The second question we had to ask ourselves was 'How to make it fast?'.
                                    Full-text search in Wikidata is a no go.
                                    That's why we decided to use Google Knowledge Graph API to support our search box.
                                    Knowledge Graph API actually brings two drawbacks to our little application.
                                    1) Search returns many items that were already published. We are not really interested in those, as we tend to look far to the future.
                                    2) We cannot guarantee we actually succeeded in matching Knowledge Graph Entity to a Wikidata Entity. For example, consider It. The first movie was published in 1990 and the remake was published in 2017. In such scenario, our system may fail.
                                    But that's the price we decided to pay in order to have a fast application.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={7}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography type="headline" component="h2">
                                    How it works
                                </Typography>

                                <Typography type="subheading" component="h3" className={classes.subheader}>
                                    Search Autocomplete
                                </Typography>
                                <Typography component="p">
                                    NotifyME uses Google Knowledge Graph to allow you to search for an upcoming movie, TV show, video game or music album.
                                    Currently only aforementioned item types are supported.
                                </Typography>

                                <Divider className={classes.divider}/>

                                <Typography type="subheading" component="h3" className={classes.subheader}>
                                    Fetching Release Dates
                                </Typography>
                                <Typography component="p">
                                    In order to get publication dates for a selected item, NotifyME fires a request to Wikidata.
                                    For a single item there may be multiple publication dates as there may be various release dates in various countries.
                                    If any of the fetched release dates is yet to come, NotifyME is going to allow you to add an event to your personal calendar.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Technologies);
