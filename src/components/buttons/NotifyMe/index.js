import React, { Component } from 'react';
import AddToCalendar from 'react-add-to-calendar';

class NotifyMe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {
                title: 'Custom event name',
                description: 'NotifyMe reminder for Custom event name',
                location: '',
                // startTime: '2017-11-13T00:00:00+01:00',
                // endTime: '2017-11-13T23:59:59+01:00'
                startDate: '2017-11-13',
                endDate: '2017-11-14'
            }
        };
    }

    render() {
        return (
            <AddToCalendar event={this.state.event}/>
        );
    }
}

export default NotifyMe;