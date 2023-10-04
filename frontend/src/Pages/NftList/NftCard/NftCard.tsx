import {AspectRatio, Card, Image, Stack, Text} from '@mantine/core';
import classes from './NftCard.module.css';
import {Link, useLocation, useParams} from "react-router-dom";
import {NftType} from "@/Pages/NftList/NftsList/NftsList.tsx";
import {shortAddress} from "@/utils/functions.ts";
import {IPFS_GATEWAY} from "@/utils/constants.tsx";

export const NftCard = ({nft}: { nft: NftType }) => {
    const {id} = useParams()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isCustom = searchParams.get('isCustom');

    return <Card
        p="2" radius="md"
        component={Link}
        to={`/nft/${id}/${nft?.tokenId}?isCustom=${isCustom}`}
        className={classes.card}
    >
        <AspectRatio mah={250}>
            <Image radius={5} src={isCustom === 'false' ? nft.image : `${IPFS_GATEWAY}${nft.image}`}/>
        </AspectRatio>
        <Stack p={'xs'} gap={'0'}>
            <Text className={classes.title} mt={3} fw={700} ta={'center'}>
                {nft.name}
            </Text>
            <Text fz={12} className={classes.title} mt={3} fw={400} ta={'center'}>
                ID: {shortAddress(nft.tokenId, 18)}
            </Text>
        </Stack>
    </Card>
};