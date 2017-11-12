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
            item: null,
            releaseDates: {}
        };
    }

    componentWillReceiveProps(nextProps){
        this.handleItemChange(nextProps.location.state.item)
    }

    componentDidMount() {
        this.handleItemChange(this.props.location.state.item);
    }

    handleItemChange = (item) => {
        this.setState({item: item});
        this.sparqlSearch(item);
    };

    sparqlSearch = (item) => {
        const sparql = `
SELECT DISTINCT ?date ?imdbId ?placeOfPublicationLabel WHERE {
  ?item ?label "${item.name}"@en .
  ?item wdt:P577 ?date .
  OPTIONAL { ?item wdt:P345 ?imdbId. }
  ?statement ps:P577 ?date.
  ?statement pq:P291 ?placeOfPublication.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} ORDER BY ASC(?date)
`;
        const url = wdk.sparqlQuery(sparql);

        axios.get(url)
            .then(res => {
                const items = res.data.results.bindings;
                let releaseDates = {};
                for (let item of items) {
                    const date = new Date(item.date.value);
                    const location = item.placeOfPublicationLabel.value;
                    if(date in releaseDates) {
                        releaseDates[date].locations.push(location);
                    } else {
                        releaseDates[date] = {
                            date: date,
                            locations: [location]
                        };
                    }
                }

                this.setState({ releaseDates: releaseDates });
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