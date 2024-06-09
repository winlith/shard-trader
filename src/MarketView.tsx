import { Box, Paper, Typography } from '@mui/material';
import { ApiItem, ApiMarketResponse } from './apiTypes';
import MarketTable from './MarketTable';
import { getItemName, servers, soil } from './ids';

export interface MarketViewProps {
    shardMarket: ApiMarketResponse | null;
    seedMarket: ApiMarketResponse | null;
    soilMarket: ApiItem | null;
}

function MarketView(props: MarketViewProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: '15px' }} />
                <Typography
                    variant="h6"
                    sx={{ margin: '5px', textAlign: 'center' }}
                >
                    Shards on {props.shardMarket?.worldName}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignContent: 'center',
                        gap: '15px',
                    }}
                >
                    {Object.keys(props.shardMarket!.items).map((key) => (
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: '10px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    alt="logo"
                                    src={`https://universalis-ffxiv.github.io/universalis-assets/icon2x/${key}.png`}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                    }}
                                ></img>
                                <Typography
                                    sx={{ textAlign: 'center', margin: '5px' }}
                                >
                                    {getItemName(parseInt(key))}
                                </Typography>
                            </Box>
                            <MarketTable
                                displayWorldName={false}
                                listings={
                                    props.shardMarket!.items[key].listings
                                }
                            />
                        </Paper>
                    ))}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: '15px' }} />
                <Typography
                    variant="h6"
                    sx={{ margin: '5px', textAlign: 'center' }}
                >
                    Seeds on {props.seedMarket?.dcName}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignContent: 'center',
                        gap: '15px',
                    }}
                >
                    {Object.keys(props.seedMarket!.items).map((key) => (
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: '10px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    alt="logo"
                                    src={`https://universalis-ffxiv.github.io/universalis-assets/icon2x/${key}.png`}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                    }}
                                ></img>
                                <Typography
                                    sx={{ textAlign: 'center', margin: '5px' }}
                                >
                                    {getItemName(parseInt(key))}
                                </Typography>
                            </Box>
                            <MarketTable
                                displayWorldName={true}
                                listings={props.seedMarket!.items[key].listings}
                            />
                        </Paper>
                    ))}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: '15px' }} />
                <Box
                    sx={{
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        alt="logo"
                        src={`https://universalis-ffxiv.github.io/universalis-assets/icon2x/${soil.id}.png`}
                        style={{
                            width: '32px',
                            height: '32px',
                        }}
                    ></img>
                    <Typography
                        variant="h6"
                        sx={{ margin: '5px', textAlign: 'center' }}
                    >
                        {soil.name} on {props.soilMarket?.dcName}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignContent: 'center',
                        gap: '15px',
                    }}
                >
                    {servers
                        .find((dc) => dc.name === props.soilMarket?.dcName)!
                        .worlds.map((world) => (
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{ textAlign: 'center', margin: '5px' }}
                                >
                                    {world.name}
                                </Typography>
                                <MarketTable
                                    displayWorldName={false}
                                    listings={props.soilMarket!.listings.filter(
                                        (l) => l.worldID === world.id
                                    )}
                                />
                            </Paper>
                        ))}
                </Box>
            </Box>
        </Box>
    );
}

export default MarketView;
