import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer";
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    headers: {
        marginBottom: 35
    }
});

class Landing extends Component {

    handleSearchSubmit = (items) => {
        if(items.length === 0) {
            return;
            // We have to do something
        }

        this.props.history.push({
                pathname: "/item-list",
                state: {items: items}
            }
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={40}>
                    <Grid item xs={12}>
                        <Typography
                            align={'center'}
                            type={'display4'}
                            className={classes.headers} >
                            NotifyME
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.headers}>
                        <Typography align={'center'} type={'headline'}>Something clever and fantastic</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchContainer
                            handleSearchSubmit={this.handleSearchSubmit}
                            buttonText={'More'}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Landing)