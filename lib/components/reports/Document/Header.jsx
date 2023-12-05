import { memo } from 'react';
import PropTypes from 'prop-types';
import { dates, formats } from 'investira.sdk';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

const Head = styled(Stack)(() => ({
    justifyContent: 'flex-end',
    marginBottom: 2,
    position: 'fixed',
    top: 0,
    height: '148px',
    width: '1416px' /* número mágico da escala do pdf em landscape */,
    padding: '16px',
    '@media print': {
        position: 'fixed',
        top: 0,
        height: '148px'
    }
}));

const Header = memo(props => {
    const { logo, titulo, plano, data_posicao, relatorio } = props.data;
    return (
        <Head component="header">
            <Stack direction="row" className="header" spacing={4} alignItems={'flex-end'}>
                <Stack>{logo && <img src={logo} alt="logo" width={80} height={80} />}</Stack>
                <Stack sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                        {titulo}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {data_posicao}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {plano}
                    </Typography>
                </Stack>
                <Stack>
                    <Typography variant="body1" component="div" align="right">
                        Relatório: {relatorio}
                    </Typography>
                    <Typography variant="body1" component="div" align="right">
                        {`Impresso em ${formats.formatDateCustom(
                            dates.toDate(),
                            'DD/MM/yyyy HH:mm:ss'
                        )}`}
                    </Typography>
                </Stack>
            </Stack>
            {props.children}
        </Head>
    );
});

Header.displayName = 'Header';

Header.propTypes = {
    children: PropTypes.node,
    data: PropTypes.shape({
        logo: PropTypes.string,
        titulo: PropTypes.string,
        data_posicao: PropTypes.string,
        plano: PropTypes.string,
        relatorio: PropTypes.string
    })
};

export default Header;
