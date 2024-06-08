import { useEffect, useState } from 'react';
import { CommonProps } from './types';
import {
    Box,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import MarketView from './MarketView';
import PlaceholderView from './PlaceholderView';
import ErrorView from './ErrorView';

function MainMenu(props: CommonProps) {
    const [selectedDc, setSelectedDc] = useState('');
    const [selectedWorldId, setSelectedWorldId] = useState('');
    const [selectedTab, setSelectedTab] = useState('market');
    const [marketLoaded, setMarketLoaded] = useState(false);

    useEffect(() => {
        if (props.settings.dc) setSelectedDc(props.settings.dc);
        if (props.settings.worldId)
            setSelectedWorldId(props.settings.worldId.toString());
        if (props.shardMarket && props.seedMarket && props.soilMarket)
            setMarketLoaded(true);
        else setMarketLoaded(false);
    }, [props]);

    const handleTabChange = (
        event: React.MouseEvent<HTMLElement>,
        value: string
    ) => {
        setSelectedTab(value);
    };

    return (
        <Box
            sx={{
                margin: '15px 0 0 0',
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {props.error ? (
                        <>
                            <ErrorView />
                        </>
                    ) : (
                        <>
                            {marketLoaded ? (
                                <>
                                    <ToggleButtonGroup
                                        value={selectedTab}
                                        exclusive
                                        onChange={handleTabChange}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton
                                            value="market"
                                            aria-label="centered"
                                        >
                                            Market
                                        </ToggleButton>
                                        <ToggleButton
                                            value="calc"
                                            aria-label="left aligned"
                                        >
                                            Calculator
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                    {selectedTab === 'market' && (
                                        <MarketView
                                            shardMarket={props.shardMarket}
                                            seedMarket={props.seedMarket}
                                            soilMarket={props.soilMarket}
                                        />
                                    )}
                                    {selectedTab === 'calc' && (
                                        <Typography>
                                            not implemented yet lmao
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <PlaceholderView />
                            )}
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}

export default MainMenu;
