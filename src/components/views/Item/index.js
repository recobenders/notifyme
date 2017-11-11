import React, { Component } from 'react';
import axios from 'axios';
import wdk from 'wikidata-sdk';
import InfoContainer from "../../containers/InfoContainer";
import NotifyContainer from "../../containers/NotifyContainer";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.location.state.item,
            releaseDates: []
        };
    }

    componentDidMount() {
        const sparql = `
SELECT DISTINCT ?date WHERE {
  ?item ?label "${this.state.item.name}"@en .
  ?item wdt:P577 ?date .
  FILTER(now() <= ?date) .
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
        const item = this.state.item;
        if(item == null) return null;
        return (
            <div>
                <h2>Item view #{item.name}</h2>
                <InfoContainer item={item}/>
                <NotifyContainer item={item} releaseDates={this.state.releaseDates}/>
            </div>
        );
    }
}

export default Item;