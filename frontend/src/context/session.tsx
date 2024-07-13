import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAccount } from "wagmi";
import { createWalletClientFromWallet, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getPimlicoSmartAccountClient } from "@/lib/permissionless";

export type SessionValue = {
    isSetUpLoading: boolean
    smartAccountClient: any
};

const SessionContext = createContext<SessionValue>({} as SessionValue);

type SessionProviderProps = {
    children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
    const [isSetUpLoading, setIsSetUpLoading] = useState(false)
    const [smartAccountClient, setSmartAccountClient] = useState<any>()

    const { address, chain } = useAccount();
    const { primaryWallet, isAuthenticated } = useDynamicContext();

    useEffect(() => {
        if (isAuthenticated && primaryWallet && !smartAccountClient) {
            fetchProvider();
        }
    }, [address, isAuthenticated, primaryWallet]);

    const fetchProvider = async () => {
        if (!address || !chain) return
        setIsSetUpLoading(true);
        try {
            if (!primaryWallet) throw new Error("Invalid dynamic primary wallet")

            const walletClient = await createWalletClientFromWallet(primaryWallet)
            const smartClient = await getPimlicoSmartAccountClient(address, chain, walletClient)

            setSmartAccountClient(smartClient)
            console.log(`wallet address: ${address}`)
            console.log(`smart address: ${smartClient.account.address}`)
        } catch (error) {
            console.log("Error setting up provider: ", error)
        } finally {
            setIsSetUpLoading(false);
        }
    };

    const value: SessionValue = {
        isSetUpLoading,
        smartAccountClient,
    };

    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    );
}

export function useSession(): NonNullable<SessionValue> {
    return useContext(SessionContext);
}
