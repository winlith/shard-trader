import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { servers } from './ids';
import { useEffect, useState } from 'react';
import { CommonProps } from './types';
import { settingsKey } from './App';
import { getSeedMarket, getShardMarket, getSoilMarket } from './apiServices';

const dcs = servers.map((s) => s.name);

function WorldSettings(props: CommonProps) {
    const [selectedDc, setSelectedDc] = useState('');
    const [selectedWorldId, setSelectedWorldId] = useState('');
    const [currentDcWorldList, setCurrentDcWorldList] = useState(
        [] as { name: string; id: number }[]
    );
    const [loading, setLoading] = useState(false);

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

    const handleCheckMarket = async () => {
        if (selectedDc && selectedWorldId) {
            const parsedWorldId = parseInt(selectedWorldId);
            setLoading(true);
            const shardMarket = await getShardMarket(parsedWorldId);
            const seedMarket = await getSeedMarket(selectedDc);
            const soilMarket = await getSoilMarket(selectedDc);
            setLoading(false);
            if (shardMarket.error || seedMarket.error || soilMarket.error) {
                props.setError(true);
            } else {
                props.setShardMarket(shardMarket.response!);
                props.setSeedMarket(seedMarket.response!);
                props.setSoilMarket(soilMarket.response!);
                props.setError(false);
            }

            const newSettings = structuredClone(props.settings);
            newSettings.dc = selectedDc;
            newSettings.worldId = parsedWorldId;
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            startIcon={<RefreshIcon />}
                            variant="outlined"
                            sx={{ alignSelf: 'center' }}
                            onClick={handleCheckMarket}
                            disabled={
                                loading ||
                                selectedDc === '' ||
                                selectedWorldId === ''
                            }
                        >
                            Check market
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </FormControl>
            </Paper>
        </Box>
    );
}

export default WorldSettings;
