import {ActionIcon, Box, Text, useMantineColorScheme} from "@mantine/core";
import {IconChevronLeft} from "@tabler/icons-react";
import {Link} from "react-router-dom";

const PageWrapper = ({backIcon, children, content, title, backLink = null}: {
    backIcon?: any,
    content?: any,
    backLink?: string | null,
    title: string,
    children: any
}) => {
    const {colorScheme} = useMantineColorScheme();
    return (
        <Box px={'sm'}>
            <Box pos={'relative'}>
                {backLink &&
                    <ActionIcon
                        component={Link}
                        to={backLink}
                        left={content ? 5 : 0}
                        size={'30px'}
                        top={content ? 5 : 5}
                        pos={'absolute'}
                        variant={content ? 'filled' : 'subtle'}
                        style={{zIndex: 1}}
                        color={colorScheme === 'dark' ? 'white' : 'gray'}
                    >
                        {backIcon ?? <IconChevronLeft/>}
                    </ActionIcon>
                }
                {content ??
                    <Text fz={28} ta="center" fw={700}>
                        {title}
                    </Text>
                }
            </Box>
            {children}
        </Box>
    );
};

export default PageWrapper;