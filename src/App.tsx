import React, { useEffect, useState } from 'react';
import { Settings } from './types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WorldSettings from './WorldSettings';

export const SettingsContext = React.createContext<{
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
} | null>(null);

const settingsKey = 'shardTraderSettings';

const defaultTheme = createTheme();

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

    useEffect(() => {
        localStorage.setItem(settingsKey, JSON.stringify(settings));
    }, [settings]);

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
            <SettingsContext.Provider
                value={{ settings: settings, setSettings: setSettings }}
            >
                <Box>
                <WorldSettings></WorldSettings>
                {/* <MainMenu></MainMenu> */}
                </Box>
            </SettingsContext.Provider>
        </ThemeProvider>
    );
}

export default App;
