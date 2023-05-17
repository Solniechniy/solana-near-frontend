export type NearAddressStorage = {
  "version": "0.1.0",
  "name": "near_address_storage",
  "instructions": [
    {
      "name": "createUserData",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "addr",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "owner",
            "docs": [
              "Actual user wallet"
            ],
            "type": "publicKey"
          },
          {
            "name": "nearAddress",
            "docs": [
              "Actual near address public key"
            ],
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    }
  ]
};

export const IDL: NearAddressStorage = {
  "version": "0.1.0",
  "name": "near_address_storage",
  "instructions": [
    {
      "name": "createUserData",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "addr",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "owner",
            "docs": [
              "Actual user wallet"
            ],
            "type": "publicKey"
          },
          {
            "name": "nearAddress",
            "docs": [
              "Actual near address public key"
            ],
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    }
  ]
};
