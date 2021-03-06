import React, { Component } from 'react';
import ItemPreview from "../../ItemPreview/index";
import Grid from 'material-ui/Grid';
import { ListItem } from 'material-ui/List';

class ItemPreviewListContainer extends Component {
    render() {
        let items = this.props.items;
        return (
            <Grid container justify="center" spacing={40}>
                <Grid item xs={12}>
                    {
                        items.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ListItem>
                                        <ItemPreview item={item}/>
                                    </ListItem>
                                </div>);
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}

export default ItemPreviewListContainer;