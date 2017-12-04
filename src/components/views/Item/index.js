import React, { Component } from 'react';
import InfoContainer from "../../containers/InfoContainer";
import Grid from 'material-ui/Grid';
import SearchContainer from "../../containers/SearchContainer"
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    itemContainer: {
        marginTop: 35
    }
});

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            releaseDates: {},
            loading: true
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({releaseDates: {}, loading: true});
        this.handleItemChange(nextProps.location.state.item)
    }

    componentDidMount() {
        this.handleItemChange(this.props.location.state.item);
    }

    handleItemChange = (item) => {
        this.setState({item: item});
        this.wikidataSearch(item);
    };

    wikidataSearch = (item) => {
        var self = this;
        fetch('/api/search/wikidata', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: item
            })
        })
            .then(res => res.json())
            .then(function(json) {
                self.setState({ releaseDates: json.releaseDates, loading: false });
            })
            .catch(function(err) {
                console.log(err);
                self.setState({ loading: false });
            });
    };

    handleSearchSubmit = (items) => {
        if(items.length === 0) { return; }
        this.props.history.push({
                pathname: "/item-list",
                state: {items: items}
            }
        );
    };

    render() {
        const item = this.state.item;
        if(item === null) return null;

        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={12} className={classes.itemContainer}>
                        <SearchContainer
                            handleSearchSubmit={this.handleSearchSubmit}
                            buttonText={'More'}
                            hideResultsAfterSubmit={false}
                        />
                    </Grid>

                    <Grid item xs={7} className={classes.itemContainer}>
                        <InfoContainer item={item} releaseDates={this.state.releaseDates} loading={this.state.loading}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Item);