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
import { Settings } from './types';
import { settingsKey } from './App';

const dcs = servers.map((s) => s.name);

export interface WorldSettingsProps {
    settings: Settings;
    setSettings: (settings: Settings) => void;
}

function WorldSettings(props: WorldSettingsProps) {
    const [selectedDc, setSelectedDc] = useState('');
    const [selectedWorldId, setSelectedWorldId] = useState('');
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

    useEffect(() => {
        if (props.settings.dc) setSelectedDc(props.settings.dc);
        if (props.settings.worldId)
            setSelectedWorldId(props.settings.worldId.toString());
    }, [props]);

    const handleDcChange = (e: SelectChangeEvent<string>) => {
        setSelectedDc(e.target.value);
        setSelectedWorldId('');
    };

    const handleWorldChange = (e: SelectChangeEvent<string>) => {
        setSelectedWorldId(e.target.value);
    };

    const handleCheckMarket = () => {
        // actually check market
        // ...
        // set and save settings
        if (selectedDc && selectedWorldId) {
            const newSettings = structuredClone(props.settings);
            newSettings.dc = selectedDc;
            newSettings.worldId = Number.parseInt(selectedWorldId);
            props.setSettings(newSettings);
            localStorage.setItem(settingsKey, JSON.stringify(newSettings));
        }
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
                            <MenuItem value={world.id.toString()}>
                                {world.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <Button
                        variant="outlined"
                        sx={{ alignSelf: 'center' }}
                        onClick={handleCheckMarket}
                    >
                        Check market
                    </Button>
                </FormControl>
            </Paper>
        </Box>
    );
}

export default WorldSettings;
