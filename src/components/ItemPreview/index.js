import React, { Component } from 'react';
import axios from 'axios';
import wdk from 'wikidata-sdk';
import InfoContainer from '../containers/InfoContainer';
import NotifyContainer from "../containers/NotifyContainer";
import Grid from 'material-ui/Grid';

class ItemPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            releaseDates: []
        };
    }

    // DRY
    componentDidMount() {
        const sparql = `
SELECT DISTINCT ?date WHERE {
  ?item ?label "${this.props.item.name}"@en .
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

    render() {
        const item = this.props.item;
        return (
            <Grid container justify="center" spacing={40}>
                <Grid item xs={12}>
                    <InfoContainer item={item} />
                </Grid>
                <Grid item xs={12}>
                    <NotifyContainer item={item} releaseDates={this.state.releaseDates}/>
                </Grid>
            </Grid>
        );
    }
}

export default ItemPreview;