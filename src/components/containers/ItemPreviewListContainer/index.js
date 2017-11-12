import React, { Component } from 'react';
import ItemPreview from "../../ItemPreview/index";
import Grid from 'material-ui/Grid';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class ItemPreviewListContainer extends Component {
    render() {
        let items = this.props.items;
        return (
            <Grid container justify="center" spacing={40}>
                <Grid item xs={12}>
                    <List>
                        {
                            items.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ListItem>
                                            <ItemPreview item={item}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>);
                            })
                        }
                    </List>
                </Grid>
            </Grid>
        );
    }
}

export default ItemPreviewListContainer;