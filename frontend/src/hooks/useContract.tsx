import { useState } from "react";
import { erc20Abi } from "viem";
import { useSession } from "@/context/session";


export function useContract() {
    const [isLoading, setIsLoading] = useState(false);

    const { smartAccountClient, walletClient } = useSession()
    const USDC_ADDRESS = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"

    const executeContractAction = async (functionName: string, contractAddress: string, ...args: any) => {
        try {
            if (!smartAccountClient) throw new Error("Invalid smart account client")

            setIsLoading(true);
            console.log(`Executing ${functionName} action.`)
            return await walletClient.writeContract({
                abi: erc20Abi,
                address: contractAddress as `0x${string}`,
                functionName,
                args,
            });
        } catch (error) {
            console.error(`Error executing ${functionName} onchain: `, error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        approve: (spender: string, amount: number) =>
            executeContractAction("approve", USDC_ADDRESS, spender, BigInt(amount)),
        transfer: (receiver: string, amount: number) =>
            executeContractAction("transfer", USDC_ADDRESS, receiver, BigInt(amount)),
    };
}
