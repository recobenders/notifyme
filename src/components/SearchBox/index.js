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
        var self = this;
        fetch('/api/search/knowledge_graph', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: input
            })
        })
            .then(res => res.json())
            .then(function(json) {
                self.props.handleResultUpdate(json.items);
            })
            .catch(function(err) {
                console.log(err);
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
                                <MuiThemeProvider theme={blueTheme}>
                                    <TextField
                                        type="search"
                                        placeholder="Search for a movie, TV show, video game or music album you are interested in."
                                        autoComplete="off"
                                        margin="normal"
                                        fullWidth
                                        id='item-search'
                                        onChange={this.searchKnowledgeApi}
                                        onClick={() => this.props.handleShowResults(true)}
                                        onBlur={this.waitToHideResults}
                                    />
                                </MuiThemeProvider>
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