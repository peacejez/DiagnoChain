// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DiagnosisRegistry {
    struct Record {
        address patient;
        string disease;
        string aiHash;
        uint256 timestamp;
    }

    event RecordAdded(address indexed patient, string disease, string aiHash, uint256 timestamp);

    Record[] public records;

    function addRecord(string memory disease, string memory aiHash) public {
        records.push(Record({
            patient: msg.sender,
            disease: disease,
            aiHash: aiHash,
            timestamp: block.timestamp
        }));
        emit RecordAdded(msg.sender, disease, aiHash, block.timestamp);
    }

    function getRecords() public view returns (Record[] memory) {
        return records;
    }

    function count() public view returns (uint256) {
        return records.length;
    }
}
