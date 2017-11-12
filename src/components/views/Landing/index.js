import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer";
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    headers: {
        marginBottom: 35,
        paddingTop: 50,
        fontSize: '4.0rem'
    },
    title: {
        marginBottom: 35
    },
    logo: {
        width: 180,
        height: 180
    }
});

class Landing extends Component {

    handleSearchSubmit = (items) => {
        if(items.length === 0) { return; }
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
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify='center'>
                            <Grid item xs={8}>
                                <Grid container justify='center'>
                                    <Grid item xs={6} align="right">
                                        <img src="/logoNME.png" className={classes.logo}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography type={'display3'} className={classes.headers}>
                                            NotifyME
                                        </Typography>
                                    </Grid>
                                    <Divider/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.title}>
                        <Typography align={'center'} type={'headline'}>
                            Never miss a thing anymore.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchContainer
                            handleSearchSubmit={this.handleSearchSubmit}
                            buttonText={'More'}
                            hideResultsAfterSubmit={false}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Landing)