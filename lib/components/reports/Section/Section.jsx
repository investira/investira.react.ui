import PropTypes from 'prop-types';
import { Stack, Card, Typography, Divider, TableBody } from '@mui/material';

const Section = props => {
    return (
        <Card component="table" variant="outlined" sx={{ mb: 2, width: '100%' }}>
            {props.label && (
                <thead>
                    <tr>
                        <td>
                            <Stack direction="row" alignItems="center" mx={2} my={2} spacing={1.5}>
                                {props.iconSrc && <img src={props.iconSrc} width="24px" />}
                                <Typography variant="h6">{props.label}</Typography>
                            </Stack>

                            <Divider />
                        </td>
                    </tr>
                </thead>
            )}
            <TableBody>{props.children}</TableBody>
        </Card>
    );
};

Section.propTypes = {
    label: PropTypes.string,
    iconName: PropTypes.string,
    iconSrc: PropTypes.string,
    children: PropTypes.node
};

export default Section;
