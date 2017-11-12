// Significant part of this component's code is taken from: https://github.com/jasonsalzman/react-add-to-calendar/

import React, { Component } from 'react';
import moment from "moment";
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import helpersClass from "../../../helpers/add_to_calendar_helper";
const helpers = new helpersClass();

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

class NotifyMe extends Component {
    constructor(props) {
        super(props);

        const date = this.props.date;
        const startDateString = moment.utc(date).format();
        const endDateString = moment.utc(date).add(1, 'hour').format();

        this.state = {
            optionsOpen: props.optionsOpen || false,
            event: {
                title: this.props.item.name,
                description: this.props.item.description,
                location: '',
                startTime: startDateString,
                endTime: endDateString
            }
        };

        this.toggleCalendarDropdown = this.toggleCalendarDropdown.bind(this);
        this.handleDropdownLinkClick = this.handleDropdownLinkClick.bind(this);
    }

    toggleCalendarDropdown() {
        let showOptions = !this.state.optionsOpen;

        if (showOptions) {
            document.addEventListener("click", this.toggleCalendarDropdown, false);
        } else {
            document.removeEventListener("click", this.toggleCalendarDropdown);
        }

        this.setState({ optionsOpen: showOptions });
    }

    handleDropdownLinkClick(e) {
        e.preventDefault();
        let url = e.currentTarget.getAttribute("href");

        if (
            !helpers.isMobile() &&
            (url.startsWith("data") || url.startsWith("BEGIN"))
        ) {
            let filename = "download.ics";
            let blob = new Blob([url], { type: "text/calendar;charset=utf-8" });

            if (this.state.isCrappyIE) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                /****************************************************************
                 // many browsers do not properly support downloading data URIs
                 // (even with "download" attribute in use) so this solution
                 // ensures the event will download cross-browser
                 ****************************************************************/
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } else {
            window.open(url, "_blank");
        }

        this.toggleCalendarDropdown();
    }

    renderDropdown() {
        let self = this;

        let items = this.props.listItems.map((listItem, i) => {
            let currentItem = Object.keys(listItem)[0];
            let currentLabel = listItem[currentItem];

            let icon = null;
            if (self.props.displayItemIcons) {
                let currentIcon = currentItem === "outlook" ||
                currentItem === "outlookcom"
                    ? "windows"
                    : currentItem;
                icon = <i className={"fa fa-" + currentIcon} />;
            }

            return (
                <ListItem button key={i}>
                    <a
                        className={currentItem + "-link"}
                        onClick={self.handleDropdownLinkClick}
                        href={helpers.buildUrl(
                            self.state.event,
                            currentItem
                        )}
                        target="_blank">
                        {icon}
                        {currentLabel}
                    </a>
                </ListItem>
            );
        });

        return (
            <div>
                <List>
                    {items}
                </List>
            </div>
        );
    }

    render() {
        const { classes } = this.props;

        let dropdown = null;
        if (this.state.optionsOpen) {
            dropdown = this.renderDropdown();
        }

        return (
            <div>
                <Button raised className={classes.button} onClick={this.toggleCalendarDropdown}>
                    <Send className={classes.leftIcon} />
                    Notify Me
                </Button>
                {dropdown}
            </div>
        );
    }
}

NotifyMe.defaultProps = {
    displayItemIcons: true,
    optionsOpen: false,
    listItems: [
        { apple: "Apple Calendar" },
        { google: "Google" },
        { outlook: "Outlook" },
        { outlookcom: "Outlook.com" },
        { yahoo: "Yahoo" }
    ]
};

export default withStyles(styles)(NotifyMe);