import React, { Component } from 'react';
import NotifyMe from '../../buttons/NotifyMe';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class NotifyContainer extends Component {

    render() {
        return (
            <div>
                <Grid container spacing={16} justify="center" >
                    <Grid item xs={12}>
                        <Typography
                            align={'center'} >
                            {this.props.item.name} is about to be released on:
                        </Typography>
                    </Grid>

                    {this.props.releaseDates.map((releaseDate, i) =>
                        <Grid item xs={12} key={i}>
                            <Grid container spacing={16}>
                                <Grid item xs={6}>
                                    <Typography
                                        align={'center'}
                                        type={'body2'} >
                                        {releaseDate.toISOString().substring(0, 10)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <NotifyMe item={this.props.item} date={releaseDate} />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export default NotifyContainer;