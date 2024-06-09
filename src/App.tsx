import React, { useEffect, useState } from 'react';
import { Settings } from './types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import WorldSettings from './WorldSettings';
import MainMenu from './MainMenu';
import { ApiItem, ApiMarketResponse, ApiTaxRates } from './apiTypes';

export const settingsKey = 'shardTraderSettings';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [error, setError] = useState(false);
    const [settings, setSettings] = useState<Settings>({});
    const [shardMarket, setShardMarket] = useState<ApiMarketResponse | null>(
        null
    );
    const [seedMarket, setSeedMarket] = useState<ApiMarketResponse | null>(
        null
    );
    const [soilMarket, setSoilMarket] = useState<ApiItem | null>(null);
    const [taxRates, setTaxRates] = useState<ApiTaxRates | null>(null);

    useEffect(() => {
        const localSettings = localStorage.getItem(settingsKey);
        if (localSettings) {
            try {
                const parsed: Settings = JSON.parse(localSettings);
                setSettings(parsed);
            } catch {}
        }
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <img
                            alt="logo"
                            src="https://universalis-ffxiv.github.io/universalis-assets/icon2x/7.png"
                            style={{
                                width: '48px',
                                height: '48px',
                                marginRight: '25px',
                            }}
                        ></img>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                Shard Trader
                            </Typography>
                            <Typography variant="caption">
                                Become the Heisenberg of Eorzea
                            </Typography>
                        </Box>
                        <Typography>
                            Powered by{' '}
                            <Button
                                variant="text"
                                href="https://universalis.app"
                                target="_blank"
                            >
                                Universalis
                            </Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <WorldSettings
                    error={error}
                    setError={setError}
                    settings={settings}
                    setSettings={setSettings}
                    shardMarket={shardMarket}
                    setShardMarket={setShardMarket}
                    seedMarket={seedMarket}
                    setSeedMarket={setSeedMarket}
                    soilMarket={soilMarket}
                    setSoilMarket={setSoilMarket}
                    setTaxRates={setTaxRates}
                ></WorldSettings>
                <MainMenu
                    error={error}
                    setError={setError}
                    settings={settings}
                    setSettings={setSettings}
                    shardMarket={shardMarket}
                    setShardMarket={setShardMarket}
                    seedMarket={seedMarket}
                    setSeedMarket={setSeedMarket}
                    soilMarket={soilMarket}
                    setSoilMarket={setSoilMarket}
                    taxRates={taxRates}
                ></MainMenu>
            </Box>
        </ThemeProvider>
    );
}

export default App;
