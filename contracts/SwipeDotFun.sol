// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract SwipeDotFun is Ownable {
    uint256 public feePercentage; // Fee percentage in basis points (e.g., 100 = 1%)
    address public feeCollectionAddress; // Address where fees are sent
    IUniswapV2Router02 public uniswapRouter;
    
    address private constant WETH = 0x4200000000000000000000000000000000000006;

    event FeePercentageUpdated(uint256 oldFee, uint256 newFee);
    event FeeCollectionAddressUpdated(address oldAddress, address newAddress);
    event SwapETHToToken(address indexed user, uint256 ethAmount, address token);
    event SwapTokenToETH(address indexed user, uint256 tokenAmount, address token);

    constructor(
        uint256 _initialFeePercentage,
        address _feeCollectionAddress,
        address _uniswapRouter
    ) Ownable(msg.sender) {
        require(_initialFeePercentage <= 10000, "Fee percentage too high");
        require(_feeCollectionAddress != address(0), "Invalid fee address");

        feePercentage = _initialFeePercentage;
        feeCollectionAddress = _feeCollectionAddress;
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
    }

    // Update the fee percentage
    function setFeePercentage(uint256 _newFeePercentage) external onlyOwner {
        require(_newFeePercentage <= 10000, "Fee percentage too high");
        emit FeePercentageUpdated(feePercentage, _newFeePercentage);
        feePercentage = _newFeePercentage;
    }

    // Update the fee collection address
    function setFeeCollectionAddress(address _newFeeCollectionAddress) external onlyOwner {
        require(_newFeeCollectionAddress != address(0), "Invalid fee address");
        emit FeeCollectionAddressUpdated(feeCollectionAddress, _newFeeCollectionAddress);
        feeCollectionAddress = _newFeeCollectionAddress;
    }

    function swapETHToToken(address _token, uint256 _ethAmount, uint256 _minTokens) external {
        require(_ethAmount > 0, "ETH required for swap");

        uint256 fee = (_ethAmount * feePercentage) / 10000;
        uint256 amountToSwap = _ethAmount - fee;

        IERC20 weth = IERC20(WETH);
        weth.transferFrom(msg.sender, address(this), _ethAmount);
        weth.approve(address(uniswapRouter), amountToSwap);

        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = _token;
        uniswapRouter.swapExactTokensForTokens(amountToSwap, _minTokens, path, msg.sender, block.timestamp);

        emit SwapETHToToken(msg.sender, _ethAmount, _token);
    }

    // Swap token to ETH and collect fees
    function swapTokenToETH(
        address _token,
        uint256 _tokenAmount,
        uint256 _minETH
    ) external {
        require(_tokenAmount > 0, "Token amount required");

        IERC20(_token).transferFrom(msg.sender, address(this), _tokenAmount);

        IERC20(_token).approve(address(uniswapRouter), _tokenAmount);

        address[] memory path = new address[](2);
        path[0] = _token;
        path[1] = WETH;
        uniswapRouter.swapExactTokensForETH(
            _tokenAmount,
            _minETH,
            path,
            msg.sender,
            block.timestamp
        );

        emit SwapTokenToETH(msg.sender, _tokenAmount, _token);
    }
}
