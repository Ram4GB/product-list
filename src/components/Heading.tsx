import { SxProps, Typography } from '@mui/material';
import { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<typeof Typography> {
    level: 'h1' | 'h2' | 'h3';
}

const Heading: FC<Props> = props => {
    let styles: SxProps;
    if (props.level === 'h1') {
        styles = {
            fontSize: '1.4rem',
        };
    } else if (props.level === 'h2') {
        styles = {
            fontSize: '1.3rem',
        };
    } else {
        styles = {
            fontSize: '1.2rem',
        };
    }

    return (
        <Typography
            sx={() => ({
                fontWeight: 'bold',
                marginBottom: '12px',
                ...styles,
            })}
            {...props}
        >
            {props.children}
        </Typography>
    );
};

export default Heading;
