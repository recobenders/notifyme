import React, { Component } from 'react';
import NotifyMe from '../../buttons/NotifyMe';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class NotifyContainer extends Component {

    render() {
        const releaseDates = this.props.releaseDates;
        let futureEvents = {};
        let pastEvents = {};

        for (var item in releaseDates) {
            let releaseDate = releaseDates[item].date;
            if (releaseDate >= new Date()) {
                futureEvents[item] = releaseDates[item];
            } else {
                pastEvents[item] = releaseDates[item];
            }
        }

        let futureEventsLabel = null;
        if(Object.keys(futureEvents).length > 0) {
            futureEventsLabel = <Grid item xs={12}>
                <Typography
                    align={'center'} >
                    {this.props.item.name} is about to be published on:
                </Typography>
            </Grid>;
        } else {
            futureEventsLabel = <Grid item xs={12}>
                <Typography
                    align={'center'} >
                    No upcoming release dates were found for this item.
                </Typography>
            </Grid>;
        }

        return (
            <Grid container spacing={16} justify="center" >
                {futureEventsLabel}
                {Object.keys(futureEvents).map((key, i) =>
                    <Grid item xs={12} key={i}>
                        <Grid container spacing={16} alignItems="center">
                            <Grid item xs={3}>
                                <Typography
                                    align={'center'}
                                    type={'body2'} >
                                    {futureEvents[key].date.toISOString().substring(0, 10)}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography
                                    align={'center'}
                                    type={'caption'} >
                                    {futureEvents[key].locations.join(', ')}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <NotifyMe item={this.props.item} date={futureEvents[key].date} />
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default NotifyContainer;