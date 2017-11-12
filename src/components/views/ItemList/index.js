import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer/index";
import ItemPreviewListContainer from "../../containers/ItemPreviewListContainer";
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    }
});

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.handleItemsChanged(nextProps.location.state.items);
    };

    componentDidMount(){
        this.handleItemsChanged(this.props.location.state.items);
    };

    handleItemsChanged = (items) => {
        this.setState({items: items})
    };

    handleSearchSubmit = (items) => {
        this.props.history.push({
                pathname: "/item-list",
                state: {items: items}
            }
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="center" spacing={40}>
                    <Grid item xs={12}>
                        <SearchContainer
                            handleSearchSubmit={this.handleSearchSubmit}
                            buttonText={'Search'}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <ItemPreviewListContainer items={this.state.items}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(ItemList));