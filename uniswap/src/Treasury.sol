// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
import {TickMath} from "v4-core/src/libraries/TickMath.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";

contract Treasury {

    PoolSwapTest swapRouter = PoolSwapTest(0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c);

    address constant CHALLENGE_TOKEN_ADDRESS = address(0xbD97BF168FA913607b996fab823F88610DCF7737); 
    address constant USDC_ADDRESS = address(0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d); 
    address constant HOOK_ADDRESS = address(0x3CA2cD9f71104a6e1b67822454c725FcaeE35fF6); 

    address pool;

    function setPool(address _pool) public {
        pool = _pool;
    }

    function public support (uint256 amount) {
        IERC20(USDC_ADDRESS).transferFrom(msg.sender, address(this), amount);
    }

}