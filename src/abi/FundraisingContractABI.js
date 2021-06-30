const abi = [
{
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "newBeneficiary",
        "type": "address"
        }
    ],
    "name": "BeneficiaryChanged",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "donator",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "donationAmount",
        "type": "uint256"
        }
    ],
    "name": "Donation",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "claimer",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "claimAmount",
        "type": "uint256"
        }
    ],
    "name": "DonationClaimed",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
        }
    ],
    "name": "FundraiseComplete",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "address",
        "name": "fundraiser",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "fundraiseGoal",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "uint256",
        "name": "fundraiseDeadline",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        },
        {
        "indexed": false,
        "internalType": "string",
        "name": "fundraiseAgenda",
        "type": "string"
        }
    ],
    "name": "FundraiseCreated",
    "type": "event"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        }
    ],
    "name": "getFundraise",
    "outputs": [
        {
        "components": [
            {
            "internalType": "address",
            "name": "fundraiser",
            "type": "address"
            },
            {
            "internalType": "address",
            "name": "beneficiary",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "fundraiseGoal",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "fundraiseStartTime",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "fundraiseDeadline",
            "type": "uint256"
            },
            {
            "internalType": "string",
            "name": "fundraiseAgenda",
            "type": "string"
            },
            {
            "internalType": "uint256",
            "name": "amountFunded",
            "type": "uint256"
            }
        ],
        "internalType": "struct Fundraising.Fundraise",
        "name": "",
        "type": "tuple"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        }
    ],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
    },
    {
    "inputs": [
        {
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
        },
        {
        "internalType": "uint256",
        "name": "fundraiseGoal",
        "type": "uint256"
        },
        {
        "internalType": "string",
        "name": "fundraiseAgenda",
        "type": "string"
        },
        {
        "internalType": "uint256",
        "name": "fundraiseDeadline",
        "type": "uint256"
        }
    ],
    "name": "createFundraise",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        }
    ],
    "name": "getBeneficiary",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        },
        {
        "internalType": "address",
        "name": "newBeneficiary",
        "type": "address"
        }
    ],
    "name": "setBeneficiary",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        }
    ],
    "name": "getDonationAmount",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        }
    ],
    "name": "claimFundraised",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        }
    ],
    "name": "claimDonation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "fundraiseId",
        "type": "uint256"
        }
    ],
    "name": "getAmountFunded",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    }
];

export default abi;