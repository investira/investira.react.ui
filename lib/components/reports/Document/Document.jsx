import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DocumentHead from './DocumentHead';
import DocumentFooter from './DocumentFooter';
import DocumentContent from './DocumentContent';
import DocHeader from './DocHeader';
import HeaderSpace from './HeaderSpace';
import Footer from './Footer';

const DocumentWrapper = styled(Box)(() => ({
    margin: '0 auto',
    width: '1572px' /*número mágico da escala do pdf em landscape*/,

    '@media print': {
        margin: 0
    }
}));

const Document = memo(props => {
    return (
        <DocumentWrapper id="document">
            <Box component="table" sx={{ width: '100%' }}>
                <DocumentHead>
                    <HeaderSpace />
                </DocumentHead>
                <DocumentContent>{props.children}</DocumentContent>
                <DocumentFooter />
            </Box>
            <DocHeader data={props.header} />
            <Footer />
        </DocumentWrapper>
    );
});

Document.displayName = 'Document';

Document.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.object
};

export default Document;
