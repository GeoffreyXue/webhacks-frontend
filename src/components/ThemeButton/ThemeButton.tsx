import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

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
            style={{
                position: 'absolute',
                top: 20,
                right: 20,

                width: 40,
                height: 40,

                margin: 10,
                filter: 'drop-shadow(0 0 0.75rem)',
            }}
        >
            {dark ? (
                <SunIcon style={{ width: 24, height: 24 }} />
            ) : (
                <MoonIcon style={{ width: 24, height: 24 }} />
            )}
        </ActionIcon>
    );
}
