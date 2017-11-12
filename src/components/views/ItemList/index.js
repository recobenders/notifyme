import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer/index";
import ItemPreviewListContainer from "../../containers/ItemPreviewListContainer";
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    }
});

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.location.state.items
        };
    }

    handleSearchSubmit = (items) => {
        this.setState({
            items: items
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="center" spacing={40}>
                    <Grid item xs={12}>
                        <SearchContainer
                            handleSearchSubmit={this.handleSearchSubmit}
                            buttonText={'Search'}
                            hideResultsAfterSubmit
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <ItemPreviewListContainer items={this.state.items}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ItemList);