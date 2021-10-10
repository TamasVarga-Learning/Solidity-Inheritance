// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;

contract Authorized {
    address owner;
    mapping(address => bool) admins;

    constructor(address _owner) {
        owner = _owner;
    }

    function setAdmin(address _adminAddress) public onlyOwner {
        admins[_adminAddress] = true;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You must be the owner the execute this method.");
        _;
    }

    modifier onlyAdmin {
        require(admins[msg.sender] == true, "You must be an admin the execute this method.");
        _;
    }
}