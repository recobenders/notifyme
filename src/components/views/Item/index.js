import React, { Component } from 'react';
import axios from 'axios';
import wdk from 'wikidata-sdk';
import InfoContainer from "../../containers/InfoContainer";
import NotifyContainer from "../../containers/NotifyContainer";
import Grid from 'material-ui/Grid';
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
            releaseDates: {}
        };
    }

    // DRY
    componentDidMount() {
        const sparql = `
SELECT DISTINCT ?date ?imdbId ?placeOfPublicationLabel WHERE {
  ?item ?label "${this.state.item.name}"@en .
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
    }

    render() {
        const item = this.state.item;
        if(item == null) return null;

        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center" spacing={40}>
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