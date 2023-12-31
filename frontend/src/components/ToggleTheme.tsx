import {Group, Switch, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import {IconMoonStars, IconSun} from '@tabler/icons-react';

export const ToggleTheme = () => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <Group>
            <Switch
                size="sm"
                checked={colorScheme === 'dark'}
                onChange={() => toggleColorScheme()}
                onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5}/>}
                offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5}/>}
            />
        </Group>
    );
};