import React, { Component } from 'react';
import NotifyMe from '../../buttons/NotifyMe';

class NotifyContainer extends Component {

    render() {
        return (
            <div>
                Some notification options
                <NotifyMe />
            </div>
        );
    }
}

export default NotifyContainer;