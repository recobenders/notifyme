import React, { Component } from 'react';
import NotifyMe from '../../buttons/NotifyMe';

class NotifyContainer extends Component {

    render() {
        return (
            <div>
                {this.props.releaseDates.map(releaseDate =>
                    <div>
                        <NotifyMe item={this.props.item} date={releaseDate} />
                    </div>
                )}
            </div>
        );
    }
}

export default NotifyContainer;