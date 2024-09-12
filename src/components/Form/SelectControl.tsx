import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
    control: Control<any>;
    name: string;
    label?: string;
    menus: {
        label: string;
        value: string;
    }[];
    multiple?: boolean;
}

const SelectControl: FC<Props> = ({ control, name, label, menus, multiple }) => {
    const { fieldState, field } = useController({
        name,
        control,
    });

    return (
        <FormControl error={!!fieldState.error} fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select multiple={multiple} label={label} {...field}>
                {menus.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
};

export default SelectControl;
