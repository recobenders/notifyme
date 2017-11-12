import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import teal from 'material-ui/colors/teal'

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
        textAlign: 'center'
    },
    appBar: {
        background: teal['A700']
    },
    title: {
        position: 'absolute',
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

class TopBar extends Component {

    handleTitleOnClick = () => {
        this.props.history.push({
                pathname: "/",
            }
        );
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography type="title" color="inherit" className={classes.title}
                                    onClick={this.handleTitleOnClick}>
                            Notify Me
                        </Typography>
                        <div id='hackbit-vote-widget' className={classes.flex}/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(TopBar);