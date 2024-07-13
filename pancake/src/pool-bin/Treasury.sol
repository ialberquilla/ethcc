// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {ICLPoolManager} from "@pancakeswap/v4-core/src/pool-cl/interfaces/ICLPoolManager.sol";
import {PoolKey} from "@pancakeswap/v4-core/src/types/PoolKey.sol";
import {CLBaseHook} from "./pool-cl/CLBaseHook.sol";

contract Treasury {
    PoolSwapTest swapRouter =
        PoolSwapTest(0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c);

    address constant CHALLENGE_TOKEN_ADDRESS =
        address(0xbD97BF168FA913607b996fab823F88610DCF7737);
    address constant USDC_ADDRESS =
        address(0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d);
    address constant HOOK_ADDRESS =
        address(0x3CA2cD9f71104a6e1b67822454c725FcaeE35fF6);

    address pool;

    function setPool(address _pool) public {
        pool = _pool;
    }

    function support(uint256 amount, adddress gamer) public {
        IERC20(USDC_ADDRESS).transferFrom(msg.sender, address(this), amount);
        swapRouter.swap(key, params, testSettings, hookData);

        PoolKey memory pool = PoolKey({
            currency0: CHALLENGE_TOKEN_ADDRESS,
            currency1: USDC_ADDRESS,
            fee: 4000,
            tickSpacing: tickSpacing,
            hooks: IHooks(HOOK_ADDRESS)
        });

        bool zeroForOne = true;
        ICLPoolManager.SwapParams memory params = ICLPoolManager.SwapParams({
            zeroForOne: true,
            amountSpecified: amount,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT 
        });

        bytes memory hookData = new bytes(abi.encodePacked(gamer);
        swapRouter.swap(pool, params, {takeClaims: false, settleUsingBurn: false}, hookData);
    }
}
