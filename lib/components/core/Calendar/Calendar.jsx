import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar as MuiDateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import brLocale from 'date-fns/locale/pt-BR';

const CalendarPicker = styled(MuiDateCalendar)(() => ({
    width: '100%',
    '& > .MuiCalendarPicker-viewTransitionContainer': {
        '& > div': {
            '& > div:first-of-type': {
                justifyContent: 'space-evenly'
            },
            '& > div:last-of-type div': {
                justifyContent: 'space-evenly',
                '& > div': {
                    //margin: "4px 0",
                }
            }
        }
    }
}));

const Calendar = memo(props => {
    const { initialSelectDate, onChange, calendarPickerProps } = props;

    const [date, setDate] = useState(initialSelectDate || new Date());
    //const locale = 'pt-BR';

    function handleChange(pNewDate) {
        setDate(pNewDate);
    }

    useEffect(() => {
        onChange && onChange(date);
    }, [date]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
            <CalendarPicker value={date} onChange={handleChange} {...(calendarPickerProps || {})} />
        </LocalizationProvider>
    );
});

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
    initialSelectDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    displayStaticWrapperAs: PropTypes.string,
    openTo: PropTypes.string,
    disableHighlightToday: PropTypes.bool,
    calendarPickerProps: PropTypes.object
};

export default Calendar;
