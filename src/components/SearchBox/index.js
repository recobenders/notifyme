import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Search from 'material-ui-icons/Search';
import { MuiThemeProvider} from 'material-ui/styles';
import { blueTheme } from '../../helpers/button_theme_override'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        flexGrow: 1,
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
        this.props.handleShowResults(true);
        let searchTerm = event.target.value;
        this.timeout = setTimeout(() => {
            if(searchTerm !== ''){
                this.knowledgeSearch(searchTerm);
            } else {
                this.props.handleResultUpdate(null);
            }
        }, 50);
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

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleShowResults(false);
        this.props.handleResultSubmit();
    };

    waitToHideResults = () => {
        setTimeout(() => this.props.handleShowResults(false), 200)
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={8}>
                    <Grid container spacing={8}>
                        <Grid item xs={9}>
                            <form onSubmit={this.handleFormSubmit}>
                                <TextField
                                    type="search"
                                    placeholder="Search for movie, TV show, video game or music album you are interested in."
                                    margin="normal"
                                    fullWidth
                                    onChange={this.searchKnowledgeApi}
                                    onClick={() => this.props.handleShowResults(true)}
                                    onBlur={this.waitToHideResults}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={3} style={{display: 'flex'}}>
                            <MuiThemeProvider theme={blueTheme}>
                                <Button className={classes.button} onClick={this.props.handleResultSubmit}>
                                    <Search className={classes.leftIcon} />
                                    {this.props.buttonText}
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SearchBox);