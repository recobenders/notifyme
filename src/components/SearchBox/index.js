import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

const Knowledge = require('knowledge-node')({ serverKey: process.env.REACT_APP_KNOWLEDGE_API_KEY });

class SearchBox extends Component {

    getOptions = (input) => {
        const types = [
            Knowledge.types.movies,
            Knowledge.types.musicAlbum,
            Knowledge.types.tvEpisode,
            Knowledge.types.tvSeries,
            Knowledge.types.videoGame
        ];
        const limit = 10;
        let params;

        try {
            params = Knowledge.buildParams(input, types, limit);
        } catch(e) {
            return Promise.resolve({ options: [] });
        }

        return Knowledge.search(params)
            .then(body => {
                this.props.handleResultUpdate(body.itemListElement);
                // return { options: body.itemListElement.map((item) => ({
                //     label: item.result.name,
                //     value: item.result.name
                // })) };
            })
            .catch(error => {
                return { options: [] };
            });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div >
                    Submit and get to ItemList
                </div>
                <Select.Async
                    name="search_box"
                    loadOptions={this.getOptions}
                />
                <Button raised className={classes.button} onClick={this.props.handleResultSubmit}>
                    Default
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SearchBox);