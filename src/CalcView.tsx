import './CalcView.css';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { CommonProps, SingleCalculation } from './types';
import { calculate } from './calc';
import { useEffect, useState } from 'react';
import { settingsKey } from './App';
import CalcResult from './CalcResult';

function CalcView(props: CommonProps) {
    const [tax, setTax] = useState('5');
    const [plantCount, setPlantCount] = useState(0);
    const [calculateDisabled, setCalculateDisabled] = useState(true);
    const [plantInputError, setPlantInputError] = useState(false);
    const [otherCalculations, setOtherCalculations] = useState<
        SingleCalculation[]
    >([]);
    const [bestCalculation, setBestCalculation] =
        useState<SingleCalculation | null>(null);
    const [displayCalculations, setDisplayCalculations] = useState(false);

    const handlePlantCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = parseInt(e.target.value);
        setPlantCount(newVal);
        if (!isNaN(newVal) && newVal > 0) {
            // setCalculateDisabled(false);
            setPlantInputError(false);
        } else {
            // setCalculateDisabled(true);
            setPlantInputError(true);
        }
    };

    const handleTaxChange = (e: SelectChangeEvent<string>) => {
        setTax(e.target.value);
    };

    const handleCalculate = () => {
        const newSettings = structuredClone(props.settings);
        newSettings.saleTax = parseInt(tax);
        newSettings.plantCount = plantCount;
        props.setSettings(newSettings);
        localStorage.setItem(settingsKey, JSON.stringify(newSettings));

        const result = calculate(
            props.shardMarket!,
            props.seedMarket!,
            props.soilMarket!,
            parseInt(tax),
            plantCount
        );
        setBestCalculation(
            result.calculations.find((c) => c.shardId === result.bestShard)!
        );
        setOtherCalculations(
            result.calculations.filter((c) => c.shardId !== result.bestShard)!
        );
        setDisplayCalculations(true);
    };

    useEffect(() => {
        if (props.settings.saleTax) setTax(props.settings.saleTax.toString());
        if (props.settings.plantCount) setPlantCount(props.settings.plantCount);
    }, [props]);

    useEffect(() => {
        setCalculateDisabled(isNaN(plantCount) || plantCount <= 0);
    }, [plantCount]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                }}
            >
                <FormControl sx={{ mt: '20px' }}>
                    <TextField
                        type="number"
                        label="Number of plants"
                        variant="standard"
                        value={plantCount}
                        error={plantInputError}
                        helperText={
                            plantInputError
                                ? 'Enter a number greater than zero'
                                : undefined
                        }
                        onChange={handlePlantCountChange}
                    />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="tax-select-label">Tax rate</InputLabel>
                    <Select
                        labelId="tax-select-label"
                        id="tax-select"
                        label="DC"
                        value={tax}
                        onChange={handleTaxChange}
                    >
                        <MenuItem value="5">5%</MenuItem>
                        <MenuItem value="3">3%</MenuItem>
                        <MenuItem value="0">0%</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <Button
                        onClick={handleCalculate}
                        disabled={calculateDisabled}
                    >
                        Calculate
                    </Button>
                </FormControl>
            </Box>
            {displayCalculations && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ height: '15px' }} />
                    <Typography variant="caption">
                        (all prices after tax)
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ margin: '5px', textAlign: 'center' }}
                    >
                        Best profitable shard
                    </Typography>
                    <CalcResult calculation={bestCalculation!} />
                    <Box sx={{ height: '15px' }} />
                    <Typography
                        variant="h6"
                        sx={{ margin: '5px', textAlign: 'center' }}
                    >
                        Other shards
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        {otherCalculations.map((c) => (
                            <CalcResult calculation={c} />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default CalcView;
