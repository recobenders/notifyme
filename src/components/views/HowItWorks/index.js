import React, { Component } from 'react';
import Instructions from './pages/Instructions';
import Technologies from './pages/Technologies';
// import { ScrollPage, Section } from 'react-scrollpage';
// import Button from 'material-ui/Button';
// import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
// import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
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

        // return (
        //     <ScrollPage curPage={1}
        //                 totalPage={2}>
        //         <Section>
        //             <Instructions/>
        //             <Button fab color="primary" className={classes.button} onClick={this.jumpToPage(2)}>
        //                 <KeyboardArrowDown/>
        //             </Button>
        //         </Section>
        //         <Section>
        //             <Button fab color="primary" className={classes.button} onClick={this.jumpToPage(1)}>
        //                 <KeyboardArrowUp/>
        //             </Button>
        //             <Technologies/>
        //         </Section>
        //     </ScrollPage>
        // );
        return (
            <div>
                <Instructions/>
                <Technologies/>
            </div>
        );
    }
}

export default withStyles(styles)(HowItWorks);
