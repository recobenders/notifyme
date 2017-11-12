import { createMuiTheme} from 'material-ui/styles';

export const blueTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                // background: 'linear-gradient(45deg, #00BFA5 30%, #FF8E53 90%)',
                backgroundColor: '#00BFA5',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 40,
                padding: '0 30px',
                boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
                '&:hover': {
                    color: 'black',
                    background: 'black',
                }
            },
        },
    },
});

export const orangeTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: '#FF7043',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 40,
                padding: '0 30px',
                boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
                '&:hover': {
                    color: 'black',
                    background: 'white',
                }
            },
        },
    },
});
