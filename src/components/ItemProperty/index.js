import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class ItemProperty extends Component {

    render() {
        const label = this.props.label;
        const value = this.props.value;

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={3}>
                        <Typography
                            align={'left'}
                            type={'body2'} >
                            {label}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography
                            align={'left'}
                            type={'body1'} >
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ItemProperty;