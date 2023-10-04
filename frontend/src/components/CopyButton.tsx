import {Button} from '@mantine/core';
import {IconCopy} from "@tabler/icons-react";
import {useState} from "react";
import { useCopyToClipboard } from "@uidotdev/usehooks";

const CopyButton = ({str, value}: { str: string, value: string }) => {
    const [_, copyToClipboard] = useCopyToClipboard();
    const [hasCopiedText, setHasCopiedText] = useState(false)

    if (!value) return <></>

    return (
        <Button
            variant={!hasCopiedText ? 'default' : 'subtle'}
            size={'compact-sm'}
            color={hasCopiedText ? 'teal' : 'blue'}
            onClick={() => {
                copyToClipboard!(value)
                setHasCopiedText(true)
                setTimeout(() => {
                    setHasCopiedText(false)
                }, 500)
            }}
            rightSection={<IconCopy size={15}/>}
        >
            {str}
        </Button>
    );
};

export default CopyButton;