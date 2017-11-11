import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Search from 'material-ui-icons/Search';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 0,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

const Knowledge = require('knowledge-node')({ serverKey: process.env.REACT_APP_KNOWLEDGE_API_KEY });

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.timeout = null;
    }

    searchKnowledgeApi = (event) => {
        clearTimeout(this.timeout);

        let searchTerm = event.target.value;
        this.timeout = setTimeout(() => {
            if(searchTerm !== ''){
                this.knowledgeSearch(searchTerm);
            } else {
                this.props.handleResultUpdate(null);
            }
        }, 200);
    };

    knowledgeSearch = (input) => {
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
            })
            .catch(error => {
                return { options: [] };
            });
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root} >
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={8}>
                        <Grid item xs={8} style={{flexGrow: 0}}>
                            <TextField
                                type="search"
                                placeholder="Search for movie, TV show, video game or music album you are interested in"
                                margin="normal"
                                fullWidth
                                onChange={this.searchKnowledgeApi}
                            />
                        </Grid>
                        <Grid item xs={2} style={{flexGrow: 0}}>
                            <Button raised className={classes.button} onClick={this.props.handleResultSubmit}>
                                <Search className={classes.leftIcon} />
                                Show me more
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SearchBox);