import React, { Component } from 'react';
import AddToCalendar from 'react-add-to-calendar';

class NotifyMe extends Component {
    render() {
        const date = this.props.date;
        const dateString = (
            date.getFullYear() +
            '-' + ('0' + (date.getMonth() + 1)).slice(-2) +
            '-' + ('0' + date.getDate()).slice(-2) +
            'T' + ('0' + date.getHours()).slice(-2) +
            ':' + ('0' + date.getMinutes()).slice(-2) +
            ':' + ('0' + date.getSeconds()).slice(-2) +
            '+01:00'
        );
        const event = {
          title: this.props.item,
          description: this.props.item.description,
          location: '',
          startTime: dateString,
          endTime: dateString
        };

        return (
            <AddToCalendar
                event={event}
                buttonLabel="NotifyMe"
            />
        );
    }
}

export default NotifyMe;