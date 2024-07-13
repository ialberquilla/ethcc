"use client";

import { type ReactNode } from "react";
import { createConfig, fallback, http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { DynamicContextProvider } from "@/lib/dynamic";
import { DYNAMIC_ID } from "@/utils/constants";
import { arbitrumSepolia } from "viem/chains";

const rpcs = [
    "https://sepolia-rollup.arbitrum.io/rpc",
    "https://eth-sepolia.g.alchemy.com/v2/demo",
    "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
    "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",
]

const wagmiConfig = createConfig({
    chains: [arbitrumSepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
        [arbitrumSepolia.id]: fallback(rpcs.map((rpc) => http(rpc)))
    },
});

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
    return (
        <DynamicContextProvider
            settings={{
                environmentId: DYNAMIC_ID,
                walletConnectors: [EthereumWalletConnectors],
            }}
        >
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <DynamicWagmiConnector>{props.children}</DynamicWagmiConnector>
                </QueryClientProvider>
            </WagmiProvider>
        </DynamicContextProvider>
    );
}