import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider, ColorScheme, AppShell, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useHotkeys, useLocalStorageValue } from '@mantine/hooks';

import Home from './routes/Home/Home';
import Room from './routes/Room/Room';
import NoMatch from './routes/NoMatch/NoMatch';

import ThemeButton from './components/ThemeButton/ThemeButton';

export default function App() {
    const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }}>
                <ThemeButton />
                    <Router>
                        <Routes>
                            <Route path='/' element={<Shell><Home /></Shell>} />
                            <Route path='/room' element={<Shell><Room /></Shell>} />
                            <Route path='*' element={<Shell><NoMatch /></Shell>} />
                        </Routes>
                    </Router>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

interface ShellProps {
    children: React.ReactNode;
}

function Shell({ children }: ShellProps) {
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <AppShell
            styles={{
                main: {
                    background: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    padding: 0,
                    height: '100vh'
                }
            }}
        >
            {children}
        </AppShell>
    ); 
}