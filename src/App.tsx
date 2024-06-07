import React, { useEffect, useState } from 'react';
import './App.css';
import { Settings } from './types';
import WorldSettings from './WorldSettings';

export const SettingsContext = React.createContext<{
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
} | null>(null);

const settingsKey = 'shardTraderSettings';

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
        <div>
            <div></div>
            <header>
                <h1 className="header-title">Shard Trader</h1>
                <h6 className="subheader">Become the Heisenberg of Eorzea</h6>
            </header>
            <SettingsContext.Provider
                value={{ settings: settings, setSettings: setSettings }}
            >
                <WorldSettings></WorldSettings>
                {/* <MainMenu></MainMenu> */}
            </SettingsContext.Provider>
        </div>
    );
}

export default App;
