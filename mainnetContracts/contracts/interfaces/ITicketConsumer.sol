// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

interface ITicketConsumer{
    function lockTickets(address account,address ido) external;
    function unlockTickets(address account,address ido) external;
}