import React from "react";
// react components used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";



// import styles from "assets/jss/nextjs-material-dashboard-pro/components/buttonStyle.js";

import calendarEvents from "../data/events";

const localizer = momentLocalizer(moment);

// const useStyles = makeStyles(styles);

const sweetAlertStyles = { display: "block", marginTop: "-100px" };

function Calendar() {
  // const classes = useStyles();
  const [events, setEvents] = React.useState(calendarEvents);
  const [alert, setAlert] = React.useState(null);
  const selectedEvent = (event) => {
    window.alert(event.title);
  };
  const addNewEventAlert = (slotInfo) => {
    setAlert(
      <SweetAlert
        input
        showCancel
        style={ sweetAlertStyles }
        title="Input something"
        onConfirm={(e) => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
      />
    );
  };
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setAlert(null);
    setEvents(newEvents);
  };
  const hideAlert = () => {
    setAlert(null);
  };
  const eventColors = (event) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor,
    };
  };
  return (
    <>
      {alert}
              <BigCalendar
                selectable
                localizer={localizer}
                events={events}
                defaultView="month"
                scrollToTime={new Date(2015, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={(event) => selectedEvent(event)}
                onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
                eventPropGetter={eventColors}
              />
    </>
  );
}

export default Calendar;