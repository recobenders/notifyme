import React, { Component } from 'react';
import SearchBox from "../../SearchBox";
import { withRouter } from 'react-router-dom'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles'
import SearchResult from "../../SearchResult";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
});

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResults: [] };
    }

    handleResultUpdate = (results) => {
        if(results === null){
            return(this.setState({searchResults: []}));
        }
        this.setState({ searchResults: results.map((item) => {return item.result}) });
    };

    handleResultSubmit = () => {
        this.props.handleSearchSubmit(this.state.searchResults);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <SearchBox
                            handleResultUpdate={this.handleResultUpdate}
                            handleResultSubmit={this.handleResultSubmit}
                            buttonText={this.props.buttonText}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        {
                            <SearchResult searchResults={this.state.searchResults}/>
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(SearchContainer));