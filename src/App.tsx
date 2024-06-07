import React, { useEffect, useState } from 'react';
import { Settings } from './types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import WorldSettings from './WorldSettings';

export const settingsKey = 'shardTraderSettings';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [settings, setSettings] = useState<Settings>({});

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
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Shard Trader
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <WorldSettings settings={settings} setSettings={setSettings}></WorldSettings>
                {/* <MainMenu></MainMenu> */}
            </Box>
        </ThemeProvider>
    );
}

export default App;
