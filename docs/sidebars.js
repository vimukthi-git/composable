/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  internalSidebar: [{type: 'autogenerated', dirName: 'internal' }],
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Parachains',

      link: {
        type: 'generated-index',
        slug: 'parachains',
      },
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Picasso',
          link: {
            type: 'doc',
            id: 'parachains/picasso-parachain-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'parachains/picasso/picasso-crowdloan',
            'parachains/picasso/KSM-purchase-log',
            'parachains/picasso/picasso-tokenomics'
          ],
        },
        {
          type: 'category',
          label: 'Composable',
          link: {
            type: 'doc',
            id: 'parachains/composable-parachain-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'parachains/composable/composable-crowdloan',
            'parachains/composable/DOT-purchase-log',
            'parachains/composable/LAYR-tokenomics'
          ],
        }
      ]
    },
    {
      type: 'category',
      label: 'Products',

      link: {
        type: 'generated-index',
        slug: 'products',
      },
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'XCVM',
          link: {
            type: 'doc',
            id: 'products/xcvm'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/xcvm/writing-smart-contracts-with-cosmwasm',
            'products/xcvm/how-the-xcvm-works',
            'products/xcvm/routing-layer',
            'products/xcvm/routing-layer-libraries'
          ],
        },
        {
          type: 'category',
          label: 'Centauri',
          link: {
            type: 'doc',
            id: 'products/centauri-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/centauri/light-clients',
            'products/centauri/merkle-mountain-ranges',
            'products/centauri/cosmos11-BEEFY-COSMOS-IBC-light-client',
            'products/centauri/expanding-ibc-protocol'
          ],
        },
        {
          type: 'category',
          label: 'Apollo',
          link: {
            type: 'doc',
            id: 'products/apollo-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/apollo/apollo-how-it-works',
            'products/apollo/apollo-deployment'
          ],
        },
        {
          type: 'category',
          label: 'Cubic',
          link: {
            type: 'doc',
            id: 'products/cubic-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/cubic/additional-details',
          ],
        },
        {
          type: 'category',
          label: 'Pablo',
          link: {
            type: 'doc',
            id: 'products/pablo-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/pablo/swaps-trading',
            'products/pablo/liquidity-provision',
            'products/pablo/auctions-bonding',
            'products/pablo/xPBLO-fNFT-staking',
            'products/pablo/cross-chain-DEX',
            'products/pablo/governance-tokenomics',
          ],
        },
        {
          type: 'category',
          label: 'CHAOS fNFTs',
          link: {
            type: 'doc',
            id: 'products/CHAOS-fNFT-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/chaos/picasso-treasury',
            'products/chaos/use-cases'
          ],
        },
        {
          type: 'category',
          label: 'Mosaic (Discontinued)',
          link: {
            type: 'doc',
            id: 'products/mosaic-overview'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/mosaic/dynamic-fee-model',
            'products/mosaic/liquidity-forecasting',
            'products/mosaic/passive-liquidity-rebalancing',
            'products/mosaic/active-liquidity-management',
            'products/mosaic/single-sided-staking',
            'products/mosaic/additional-use-cases',
            'products/mosaic/mosaic-integrations',
            'products/mosaic/mosaic-pallet',
            'products/mosaic/mosaic-phase1-result',
            {
              type: 'category',
              label: 'Mural: NFT Transfers on Mosaic via the Summoner Vault',
              link: {
                type: 'doc',
                id: 'products/mosaic/mural-NFT-transfers/mural-NFT-transfers'
              },
              collapsible: true,
              collapsed: true,
              items: [
                'products/mosaic/mural-NFT-transfers/NFT-transfer-flow',
                'products/mosaic/mural-NFT-transfers/NFT-contract-details'
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Parachain Vault Strategy (Discontinued)',
          link: {
            type: 'doc',
            id: 'products/parachain-vault-strategy'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'products/parachain-vault-strategy/vault-process-in-detail/vault-process-in-detail',
            'products/parachain-vault-strategy/contracts-technical-details/contracts-technical-details',
          ],
        }
      ]
    },
    {
      type: 'category',
      label: 'Developer Guides',

      link: {
        type: 'generated-index',
        slug: 'developer-guides',
      },
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Nix',
          link: {
            type: 'doc',
            id: 'nix'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'nix/install',
            'nix/run-packages',
            'nix/development-environments',
            'nix/running-checks',
            'nix/defining-your-own-packages',
            'nix/composing-services-with-arion',
            'nix/editing-docs',
            'nix/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'Codespaces',
          link: {
            type: 'doc',
            id: 'codespaces'
          },
          collapsible: true,
          collapsed: true,
          items: [
            'codespaces/getting-started',
            {
              type: 'category',
              label: 'Using Codespaces',
              link: {
                type: 'doc',
                id: 'codespaces/using-codespaces'
              },
              collapsible: true,
              collapsed: false,
              items: [
                'codespaces/book',
                'codespaces/substrate',
                'codespaces/frontend',
                'codespaces/runtime-tests',
              ],
            }
          ],
        },
        'developer-guides/oracle-set-up-guide',
        'developer-guides/collator-set-up-guide'
      ]
    },
    {
      type: 'category',
      label: 'Ecosystem',

      link: {
        type: 'generated-index',
        slug: 'ecosystem',
      },
      collapsible: false,
      items: [
        'ecosystem/build-on-composable-ecosystem-development',
        'ecosystem/composable-grants',
        'ecosystem/business-line-development',
        'ecosystem/press-kit',
        'ecosystem/the-composable-team',
        'ecosystem/careers',
      ]
    },
    {
      type: 'category',
      label: 'Audits And Fixes',

      link: {
        type: 'generated-index',
        slug: 'audits',
      },
      collapsible: false,
      items: [
        'audits/audit-results-recommendations-and-remediations',
      ]
    },
    {
      type: 'category',
      label: 'FAQs',
      collapsible: false,
      items: [
        'faqs/faqs',
        'faqs/risks-disclosures'
      ]
    },
  ],
};

module.exports = sidebars;
