import React, { Component } from 'react';
import axios from 'axios';
import wdk from 'wikidata-sdk';
import InfoContainer from '../containers/InfoContainer';
import Grid from 'material-ui/Grid';
import SparqlHelperClass from "../../helpers/sparql_helper";
const sparqlHelper = new SparqlHelperClass();

class ItemPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            releaseDates: [],
            loading: true
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({releaseDates: [], loading: true});
        this.handleItemChange(nextProps.item)
    }

    componentDidMount() {
        this.handleItemChange(this.props.item);
    }

    handleItemChange = (item) => {
        this.sparqlSearch(item);
    };

    // BEWARE same function as in View > Item > index
    sparqlSearch = (item) => {
        let sparql = sparqlHelper.retrieveSparqlQuery(item);
        const url = wdk.sparqlQuery(sparql);

        axios.get(url)
            .then(res => {
                const items = res.data.results.bindings;
                let releaseDates = {};
                for (let item of items) {
                    const date = new Date(item.date.value);
                    const location = item.placeOfPublicationLabel ? item.placeOfPublicationLabel.value : null;
                    if(date in releaseDates) {
                        if(location !== null) {
                            releaseDates[date].locations.push(location);
                        }
                    } else {
                        releaseDates[date] = {
                            date: date,
                            locations: location === null ? [] : [location]
                        };
                    }
                }

                this.setState({ releaseDates: releaseDates, loading: false});
            });
    };

    render() {
        const item = this.props.item;
        return (
            <Grid container justify="center" spacing={40}>
                <Grid item xs={12}>
                    <InfoContainer item={item} releaseDates={this.state.releaseDates} loading={this.state.loading}/>
                </Grid>
            </Grid>
        );
    }
}

export default ItemPreview;