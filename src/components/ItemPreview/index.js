import React, { Component } from 'react';
import InfoContainer from '../containers/InfoContainer';
import Grid from 'material-ui/Grid';

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
        this.wikidataSearch(item);
    };

    // BEWARE same function as in View > Item > index
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