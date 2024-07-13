interface IGamer {
    function getTotalGamers() external view returns (uint256);

    function getTotalGamerEntries(address gamer) external view returns (uint256);

    function getGamerScore(address gamer) external view returns (uint256);

    function getGamerEntry(address gamer, uint256 index) external view returns (uint256, uint256);

    function addGamer(address gamer) external;

    function addGamerEntry(address gamer, uint256 score, uint256 spent_time) external;

    function updateUserScore(address gamer) external;
}