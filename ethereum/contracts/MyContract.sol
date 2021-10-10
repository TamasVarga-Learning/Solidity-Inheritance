// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;

import './Authorized.sol';

contract MyContract is Authorized {

    uint balance;

    constructor (address _owner) Authorized(_owner) {

    }

    function getBalance() public view onlyAdmin returns(uint) {
        return balance;
    }

    function setBalance(uint _newBalance) public onlyOwner {
        balance = _newBalance;
    }
}