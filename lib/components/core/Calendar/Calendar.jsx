import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  CalendarPicker as MuiCalendarPicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import brLocale from "date-fns/locale/pt-BR";

const CalendarPicker = styled(MuiCalendarPicker)(({ theme }) => ({
  width: "100%",
  "& > .MuiCalendarPicker-viewTransitionContainer": {
    "& > div": {
      "& > div:first-of-type": {
        justifyContent: "space-evenly",
      },
      "& > div:last-of-type div": {
        justifyContent: "space-evenly",
        "& > div": {
          //margin: "4px 0",
        },
      },
    },
  },
}));

const Calendar = memo((props) => {
  const [date, setDate] = useState(props.initialSelectDate);
  const locale = "pt-BR";

  function handleChange(pNewDate) {
    setDate(pNewDate);
  }

  useEffect(() => {
    props.onChange(date);
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
      <CalendarPicker
        date={date}
        onChange={handleChange}
        //disableHighlightToday={props.disableHighlightToday}
        {...props.calendarPickerProps}
      />
    </LocalizationProvider>
  );
});

Calendar.displayName = "Calendar";

Calendar.propTypes = {
  initialSelectDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  displayStaticWrapperAs: PropTypes.string,
  openTo: PropTypes.string,
  disableHighlightToday: PropTypes.bool,
  calendarPickerProps: PropTypes.object,
};

Calendar.defaultProps = {
  initialSelectDate: new Date(),
  onChange: () => {},
  displayStaticWrapperAs: "mobile",
  openTo: "year",
  disableHighlightToday: false,
  calendarPickerProps: {},
};

export default Calendar;
