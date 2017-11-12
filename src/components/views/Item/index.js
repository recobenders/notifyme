import React, { Component } from 'react';
import axios from 'axios';
import wdk from 'wikidata-sdk';
import InfoContainer from "../../containers/InfoContainer";
import NotifyContainer from "../../containers/NotifyContainer";
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    itemName: {
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

    render() {
        const item = this.state.item;
        if(item == null) return null;

        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center" spacing={24}>
                    <Grid item xs={7} className={classes.itemName}>
                        <Typography
                            align={'center'}
                            type={'display1'} >
                            {item.name}
                        </Typography>
                    </Grid>

                    <Grid item xs={7}>
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