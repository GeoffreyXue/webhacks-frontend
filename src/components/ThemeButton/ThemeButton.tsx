import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

import './ThemeButton.css';

export default function ThemeButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            className='theme-button'
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title='Toggle color scheme'
        >
            {dark ? (
                <SunIcon style={{ width: 24, height: 24 }} />
            ) : (
                <MoonIcon style={{ width: 24, height: 24 }} />
            )}
        </ActionIcon>
    );
}
