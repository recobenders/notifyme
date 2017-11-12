import React, { Component } from 'react';
import Instructions from './pages/Instructions';
import Technologies from './pages/Technologies';
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
                        totalPage={2}>
                <Section>
                    <Instructions/>
                </Section>
                <Section>
                    <Technologies/>
                </Section>
            </ScrollPage>
        );
    }
}

export default withStyles(styles)(HowItWorks);
