import { memo } from 'react';
import PropTypes from 'prop-types';
import { dates, formats } from 'investira.sdk';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Divider } from '@mui/material';

import iconCalendar from '../../assets/images/1385_calendar.svg';
import iconLocation from '../../assets/images/1220_location.svg';

const Head = styled(Stack)(() => ({
    justifyContent: 'flex-end',
    marginBottom: 2,
    position: 'fixed',
    top: 0,
    height: '148px',
    width: '1572px' /* número mágico da escala do pdf em landscape */,
    padding: '16px 4px',
    '@media print': {
        position: 'fixed',
        top: 0,
        height: '148px'
    }
}));

const DocHeader = memo(props => {
    const { logo, relatorio, plano, data_posicao, breadcrumb, entidade } = props.data;
    return (
        <Head component="header">
            <Stack
                direction="row"
                className="header"
                spacing={4}
                alignItems={'center'}
                justifyContent="stretch">
                <Stack>{logo && <img src={logo} alt="logo" width={80} height={80} />}</Stack>
                <Stack direction="row" sx={{ flexGrow: 1 }}>
                    <Stack sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            {relatorio}
                        </Typography>
                        <Typography variant="body1" component="div">
                            {plano}
                        </Typography>
                    </Stack>
                    <Stack justifyContent="flex-end" alignItems={'flex-end'} spacing={0.5}>
                        <Stack direction="row" spacing={1} alignItems={'center'}>
                            <img src={iconCalendar} width="24px" alt={data_posicao} />
                            <Typography variant="body1" component="div">
                                <b>
                                    {formats.formatDateCustom(
                                        dates.toDate(data_posicao),
                                        'DD/MM/yyyy'
                                    )}
                                </b>
                            </Typography>
                        </Stack>
                        <Stack>
                            {entidade && (
                                <Typography variant="body2" component="div" align="right">
                                    {entidade}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" my={1}>
                <Stack direction="row" spacing={1} alignItems={'center'}>
                    {breadcrumb && (
                        <>
                            <img src={iconLocation} width="12px" alt={breadcrumb} />
                            <Typography variant="body2" component="div" align="right">
                                {breadcrumb}
                            </Typography>
                        </>
                    )}
                </Stack>
                <Typography variant="body2" component="div" align="right">
                    {`Criado em ${formats.formatDateCustom(dates.toDate(), 'DD/MM/yyyy HH:mm:ss')}`}
                </Typography>
            </Stack>
        </Head>
    );
});

DocHeader.displayName = 'DocHeader';

DocHeader.propTypes = {
    children: PropTypes.node,
    data: PropTypes.shape({
        logo: PropTypes.string,
        relatorio: PropTypes.string,
        data_posicao: PropTypes.string,
        plano: PropTypes.string,
        breadcrumb: PropTypes.string,
        entidade: PropTypes.string
    })
};

export default DocHeader;
