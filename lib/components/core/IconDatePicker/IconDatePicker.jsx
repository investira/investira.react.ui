import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { Icon, DatePicker } from '../';
import PropTypes from 'prop-types';

function IconDatePicker(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, handleDateChange] = useState(props.value || null);

    const handleChange = pValue => {
        props.onChange && props.onChange(pValue);
        handleDateChange(pValue);
    };

    const { id, ...DatePickerProps } = props;

    return (
        <>
            <IconButton onClick={() => setIsOpen(true)} color={'primary'}>
                <Icon color={'primary'} iconName={'calendar'} />
            </IconButton>
            <Box sx={{ width: 0, height: 0, visibility: 'hidden' }}>
                <DatePicker
                    id={`datepicker_${id}`}
                    format={'DD/MMM/YYYY'}
                    locale={'pt-br'}
                    {...DatePickerProps}
                    value={selectedDate}
                    onChange={handleChange}
                    open={isOpen}
                    friendly={false}
                    emptyLabel={'Selecione uma data'}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                />
            </Box>
        </>
    );
}

IconDatePicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string
};

export default IconDatePicker;
