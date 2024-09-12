import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props extends React.ComponentProps<typeof TextField> {
    control: Control<any>;
    name: string;
}

const InputControl: FC<Props> = ({ control, name, ...rest }) => {
    const { fieldState, field } = useController({
        name,
        control,
    });

    return (
        <TextField
            variant="outlined"
            error={!!fieldState.error}
            {...field}
            {...rest}
            helperText={fieldState.error?.message}
        />
    );
};

export default InputControl;
