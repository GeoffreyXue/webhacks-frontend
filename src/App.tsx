import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
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
                        <Route path='/' element={<Home />} />
                        <Route path='/room'>
                            <Route path=':id' element={<Room />} />
                        </Route>
                        <Route path='*' element={<NoMatch />} />
                    </Routes>
                </Router>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
