import { useEffect, useState } from 'react';
import { CommonProps } from './types';
import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import MarketView from './MarketView';
import PlaceholderView from './PlaceholderView';
import ErrorView from './ErrorView';
import CalcView from './CalcView';

function MainMenu(props: CommonProps) {
    const [selectedTab, setSelectedTab] = useState('market');
    const [marketLoaded, setMarketLoaded] = useState(false);

    useEffect(() => {
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
                                        <CalcView
                                            error={props.error}
                                            setError={props.setError}
                                            settings={props.settings}
                                            setSettings={props.setSettings}
                                            shardMarket={props.shardMarket}
                                            setShardMarket={
                                                props.setShardMarket
                                            }
                                            seedMarket={props.seedMarket}
                                            setSeedMarket={props.setSeedMarket}
                                            soilMarket={props.soilMarket}
                                            setSoilMarket={props.setSoilMarket}
                                        />
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
