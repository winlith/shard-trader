import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { servers } from './ids';
import { useEffect, useState } from 'react';

const dcs = servers.map((s) => s.name);

function WorldSettings() {
    const [selectedDc, setSelectedDc] = useState(null as string | null);
    const [selectedWorldId, setSelectedWorldId] = useState(
        null as number | null
    );
    const [currentDcWorldList, setCurrentDcWorldList] = useState(
        [] as { name: string; id: number }[]
    );

    useEffect(() => {
        if (selectedDc) {
            const list = servers.filter((dc) => dc.name === selectedDc)[0]
                .worlds;
            if (list.length > 0) {
                setCurrentDcWorldList(list);
            } else {
                setCurrentDcWorldList([]);
            }
        }
    }, [selectedDc]);

    const handleDcChange = (e: SelectChangeEvent<string | null>) =>
        setSelectedDc(e.target.value);
    const handleWorldChange = (e: SelectChangeEvent<number | null>) => {
        let id = -1;
        if (typeof e.target.value == 'number' && !isNaN(e.target.value)) {
            id = e.target.value;
        } else {
            if (e.target.value !== null)
                id = Number.parseInt(e.target.value as string);
        }
        if (id !== -1) setSelectedWorldId(id);
    };

    return (
        <Box
            sx={{
                margin: '25px 0 0 0',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            <Paper
                sx={{
                    padding: '25px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="dc-select-label">DC</InputLabel>
                    <Select
                        labelId="dc-select-label"
                        id="dc-select"
                        label="DC"
                        value={selectedDc}
                        onChange={handleDcChange}
                    >
                        {dcs.map((dc) => (
                            <MenuItem value={dc}>{dc}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="world-select-label">World</InputLabel>
                    <Select
                        labelId="world-select-label"
                        id="world-select"
                        label="World"
                        value={selectedWorldId}
                        onChange={handleWorldChange}
                    >
                        {currentDcWorldList.map((world) => (
                            <MenuItem value={world.id}>{world.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <Button variant="outlined" sx={{ alignSelf: 'center' }}>
                        Check market
                    </Button>
                </FormControl>
            </Paper>
            {/* <Paper sx={{ padding: '25px' }}>
                <Typography>{selectedDc}</Typography>
            </Paper> */}
        </Box>
    );
}

export default WorldSettings;
