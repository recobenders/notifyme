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
                                    How it works
                                </Typography>

                                <Typography type="subheading" component="h3" className={classes.subheader}>
                                    Search Autocomplete
                                </Typography>
                                <Typography component="p">
                                    Notify Me uses Google Knowledge Graph to allow you to search for an upcoming movie, TV show, video game or music album.
                                    Currently only aforementioned item types are supported.
                                </Typography>

                                <Divider className={classes.divider}/>

                                <Typography type="subheading" component="h3" className={classes.subheader}>
                                    Fetching Release Dates
                                </Typography>
                                <Typography component="p">
                                    In order to get publication dates for a selected item, Notify Me fires a request to Wikidata.
                                    For a single item there may be multiple publication dates as there may be various release dates in various countries.
                                    If any of the fetched release dates is yet to come, Notify Me is going to allow you to add an event to your personal calendar.
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
