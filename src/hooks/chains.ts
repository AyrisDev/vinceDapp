import { Chain } from 'wagmi';

export const vinceChain = {
  id: 1903,
  name: 'VinceChain',
  network: 'vincechain',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18447.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Vince',
    symbol: 'VCE',
  },
  rpcUrls: {
    public: { http: ['http://154.53.47.14:8545'] },
    default: { http: ['http://154.53.47.14:8545'] },
  },
  blockExplorers: {
    etherscan: { name: 'BlockScout', url: 'http://154.53.47.14:4000' },
    default: { name: 'BlockScout', url: 'http://154.53.47.14:4000' },
  },
} as const satisfies Chain;
