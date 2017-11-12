import React, { Component } from 'react';
import { ScrollPage, Section } from 'react-scrollpage';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    }
});

class HowItWorks extends Component {
    render() {
        const { classes } = this.props;

        return (
            <ScrollPage curPage={1}
                        totalPage={3}>
                <Section>Page 1</Section>
                <Section>Page 2</Section>
                <Section>Page 3</Section>
            </ScrollPage>
        );
    }
}

export default withStyles(styles)(HowItWorks);
