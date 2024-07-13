// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {PoolKey} from "@pancakeswap/v4-core/src/types/PoolKey.sol";
import {BalanceDelta, BalanceDeltaLibrary} from "@pancakeswap/v4-core/src/types/BalanceDelta.sol";
import {BeforeSwapDelta, BeforeSwapDeltaLibrary} from "@pancakeswap/v4-core/src/types/BeforeSwapDelta.sol";
import {PoolId, PoolIdLibrary} from "@pancakeswap/v4-core/src/types/PoolId.sol";
import {IBinPoolManager} from "@pancakeswap/v4-core/src/pool-bin/interfaces/IBinPoolManager.sol";
import {BinBaseHook} from "./BinBaseHook.sol";

contract ChallengeToken is BinBaseHook {
    using PoolIdLibrary for PoolKey;
    using SafeCast for *;

    mapping(address => mapping(address => uint256)) public gamerBets;
    bool isChallengeActive = true;

    address treasury;
    address scoreManager;

    constructor(IBinPoolManager _poolManager, address _treasury, address _scoreManager) BinBaseHook(_poolManager) {
        treasury = _treasury;
        scoreManager = _scoreManager;
    }

    function getHooksRegistrationBitmap() external pure override returns (uint16) {
        return
            _hooksRegistrationBitmapFrom(
                Permissions({
                    beforeInitialize: false,
                    afterInitialize: false,
                    beforeMint: true,
                    afterMint: true,
                    beforeBurn: false,
                    afterBurn: false,
                    beforeSwap: true,
                    afterSwap: true,
                    beforeDonate: false,
                    afterDonate: false,
                    beforeSwapReturnsDelta: false,
                    afterSwapReturnsDelta: false,
                    afterMintReturnsDelta: false,
                    afterBurnReturnsDelta: false
                })
            );
    }

    function beforeSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata poolParams,
        bytes calldata hookData
    ) external override poolManagerOnly returns (bytes4, BeforeSwapDelta, uint24) {
        if (!isChallengeActive) {
            revert("challenge ended");
        }
        return (BaseHook.beforeSwap.selector, BeforeSwapDeltaLibrary.ZERO_DELTA, 0);
    }

    function afterSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        BalanceDelta,
        bytes calldata hookData
    ) external override returns (bytes4, int128) {
        address gamer = abi.decode(hookData, (address));

        uint256 gamerfeeDelta = IGamer(scoreManager).getGamerScore(gamer);

        gamerBets[msg.sender][gamer] = uint256(params.amountSpecified);

        poolManager.take(key.currency0, treasury, gamerfeeDelta);

        return (BaseHook.afterSwap.selector, 0);
    }
}
