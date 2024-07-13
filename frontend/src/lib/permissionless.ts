import { PIMLICO_API_KEY } from "@/utils/constants";
import { ENTRYPOINT_ADDRESS_V07, createSmartAccountClient, walletClientToSmartAccountSigner } from "permissionless";
import { signerToSimpleSmartAccount } from "permissionless/accounts";
import { createPimlicoBundlerClient, createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { Chain, WalletClient, createPublicClient, http } from "viem";

const transportUrl = (chain: Chain) =>
    `https://api.pimlico.io/v2/${chain.id}/rpc?apikey=${PIMLICO_API_KEY}`;

export const publicClient = (chain: Chain) =>
    createPublicClient({
        transport: http(chain?.rpcUrls.default.http[0].toString()),
    });

export const paymasterClient = (chain: Chain) =>
    createPimlicoPaymasterClient({
        transport: http(transportUrl(chain)),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });

export const pimlicoBundlerClient = (chain: Chain) =>
    createPimlicoBundlerClient({
        transport: http(transportUrl(chain)),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });

export const getPimlicoSmartAccountClient = async (
    address: `0x${string}`,
    chain: Chain,
    walletClient: WalletClient, //-> wallet: EmbeddedWalletState
) => {
    const signer = walletClientToSmartAccountSigner(walletClient as any);

    const simpleSmartAccountClient = await signerToSimpleSmartAccount(publicClient(chain), {
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        signer: signer,
        factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454"
    })

    console.log({
        transportUrl: transportUrl(chain),
    })

    return createSmartAccountClient({
        account: simpleSmartAccountClient,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        chain,
        bundlerTransport: http(transportUrl(chain)),
        middleware: {
            gasPrice: async () => (await pimlicoBundlerClient(chain).getUserOperationGasPrice()).fast,
            sponsorUserOperation: paymasterClient(chain).sponsorUserOperation,
        },
    });
};
