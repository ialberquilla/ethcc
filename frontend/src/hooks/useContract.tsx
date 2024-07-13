import { useState } from "react";
import { erc20Abi } from "viem";
import { useSession } from "@/context/session";

type WriteFnNames = "approve" | "transfer";

export function useContract() {
    const [isLoading, setIsLoading] = useState(false);

    const { smartAccountClient } = useSession()
    const contractAddress = ""

    const executeContractAction = async (functionName: WriteFnNames, ...args: any) => {
        try {
            if (!smartAccountClient) throw new Error("Invalid smart account client")

            setIsLoading(true);
            console.log(`Executing ${functionName} action.`)
            return await smartAccountClient.writeContract({
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
            executeContractAction("approve", spender, BigInt(amount)),
        transfer: (receiver: string, amount: number) =>
            executeContractAction("transfer", receiver, BigInt(amount)),
    };
}
