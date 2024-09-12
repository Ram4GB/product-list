import { tags } from '@/mockApi/data';
import ClearIcon from '@mui/icons-material/Clear';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { Button, MenuItem, Select, Stack } from '@mui/material';
import { FC } from 'react';

interface Props {
    status: string[];
    selectedIds?: Record<string, boolean>;
    bulkDeleteProduct: () => void;
    onFilter: (tag: string[]) => void;
    clearFilter: () => void;
}

const FilterBar: FC<Props> = ({
    status,
    selectedIds,
    onFilter,
    clearFilter,
    bulkDeleteProduct,
}) => {
    const isBulkDelete = Object.values(selectedIds ?? {}).find(it => it);

    return (
        <Stack className="mb-6" flexWrap="nowrap" flexDirection="row" gap={2}>
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

            {isBulkDelete && (
                <Button
                    variant="outlined"
                    startIcon={<RecyclingIcon />}
                    onClick={bulkDeleteProduct}
                    sx={{ flexShrink: 0 }}
                    color="error"
                >
                    Delete selected items
                </Button>
            )}

            {status.length > 0 && (
                <Button onClick={clearFilter} sx={{ flexShrink: 0 }}>
                    <ClearIcon />
                </Button>
            )}
        </Stack>
    );
};

export default FilterBar;
