import React, { Component } from 'react';
import SearchBox from "../../SearchBox";
import SearchResult from "../../SearchResult";
import { withRouter } from 'react-router-dom'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    }
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
                <Grid container>
                    <Grid item xs={12}>
                        <SearchBox
                            handleResultUpdate={this.handleResultUpdate}
                            handleResultSubmit={this.handleResultSubmit}
                        />
                    </Grid>
                </Grid>
                <SearchResult searchResults={this.state.searchResults}/>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(SearchContainer));