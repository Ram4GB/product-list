import { tags } from '@/mockApi/data';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, MenuItem, Select, Stack } from '@mui/material';
import { FC } from 'react';

interface Props {
    status: string[];
    onFilter: (tag: string[]) => void;
    clearFilter: () => void;
}

const FilterBar: FC<Props> = ({ status, onFilter, clearFilter }) => {
    return (
        <Stack className="mb-6" flexWrap="nowrap" flexDirection="row">
            <Select
                sx={{ flex: 1 }}
                displayEmpty
                value={status}
                onChange={e => onFilter(e.target.value as unknown as string[])}
                multiple={true}
                renderValue={selected => {
                    if (selected.length === 0) {
                        return <em>Filter tags</em>;
                    }

                    return selected.join(', ');
                }}
            >
                <MenuItem disabled value="">
                    <em>Filter tags</em>
                </MenuItem>
                {tags.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {status.length > 0 && (
                <Button onClick={clearFilter} sx={{ flexShrink: 0 }}>
                    <ClearIcon />
                </Button>
            )}
        </Stack>
    );
};

export default FilterBar;
