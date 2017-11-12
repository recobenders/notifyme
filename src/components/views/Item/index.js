import React, { Component } from 'react';
import axios from 'axios';
import wdk from 'wikidata-sdk';
import InfoContainer from "../../containers/InfoContainer";
import NotifyContainer from "../../containers/NotifyContainer";
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
            item: props.location.state.item,
            releaseDates: []
        };
    }

    // DRY
    componentDidMount() {
        const sparql = `
SELECT DISTINCT ?date WHERE {
  ?item ?label "${this.state.item.name}"@en .
  ?item wdt:P577 ?date .
} ORDER BY ASC(?date)
LIMIT 10
`;
        const url = wdk.sparqlQuery(sparql);

        axios.get(url)
            .then(res => {
                const releaseDates = res.data.results.bindings.map(item => new Date(item.date.value));
                this.setState({ releaseDates: releaseDates });
            });
    }

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
        if(item == null) return null;

        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center" spacing={40}>
                    <Grid item xs={12} className={classes.itemContainer}>
                        <SearchContainer
                            handleSearchSubmit={this.handleSearchSubmit}
                            buttonText={'More'}
                            hideResultsAfterSubmit={false}
                        />
                    </Grid>

                    <Grid item xs={7} className={classes.itemContainer}>
                        <InfoContainer item={item}/>
                    </Grid>

                    <Grid item xs={7}>
                        <NotifyContainer item={item} releaseDates={this.state.releaseDates}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Item);