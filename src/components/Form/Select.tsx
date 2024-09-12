import { MenuItem, Select as MuiSelect } from '@mui/material';
import { FC } from 'react';

interface Props {
    menus: {
        label: string;
        value: string;
    }[];
    multiple?: boolean;
    label?: string;
}

const Select: FC<Props> = ({ menus, multiple, label, ...rest }) => {
    return (
        <MuiSelect multiple={multiple} label={label} {...rest}>
            {menus.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </MuiSelect>
    );
};

export default Select;
