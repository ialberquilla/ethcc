Stylus contract 0x9a251db379d2e51cca7034ae1eaddcded4c006f4


Stylus interface

// SPDX-License-Identifier: MIT-OR-APACHE-2.0
pragma solidity ^0.8.23;

interface IGamers {
    function getTotalGamers() external view returns (uint256);

    function getTotalGamerEntries(address gamer) external view returns (uint256);

    function getGamerScore(address gamer) external view returns (uint256);

    function getGamerEntry(address gamer, uint256 index) external view returns (uint256, uint256);

    function addGamer(address gamer) external;

    function addGamerEntry(address gamer, uint256 score, uint256 spent_time) external;

    function updateUserScore(address gamer) external;
}