import PropTypes from 'prop-types';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import 'moment/min/locales';

const LocalizationProvider = props => {
    const { children, locale, ...restProps } = props;
    return (
        <MuiLocalizationProvider dateAdapter={AdapterMoment} locale={locale} {...restProps}>
            {children}
        </MuiLocalizationProvider>
    );
};

LocalizationProvider.propTypes = {
    children: PropTypes.node,
    locale: PropTypes.string
};

LocalizationProvider.defaultProps = {
    locale: 'pt-br'
};

LocalizationProvider.displayName = 'LocalizationProvider';

export default LocalizationProvider;
