import {ethers} from "ethers";

export const getContractInfo = async (providerUrl: string, contractAddress: string, contractAbi: any[], onError: () => void): Promise<{
    name: string,
    decimals: string,
    symbol: string,
}> => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const contractName = await contract.name();
        const contractSymbol = await contract.symbol();
        const contractDecimals = await contract.decimals();
        return {
            name: contractName,
            decimals: contractDecimals,
            symbol: contractSymbol,
        };
    } catch (error) {
        if(onError) onError()
        console.error('Error fetching contract information:', error);
        throw error;
    }
};