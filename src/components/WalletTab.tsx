import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowUp, ArrowDown, Coins, Lock, Wallet, ChartBar } from 'lucide-react';

const liquidityPairs = [
  {
    symbol: 'HAND-USDGLO',
    name: 'HAND/USDGLO LP',
    tvl: 333420,
    balance: 100,
    price: 2.15,
    change24h: 5.2,
  },
  {
    symbol: 'EARTH-USDGLO',
    name: 'EARTH/USDGLO LP',
    tvl: 150000,
    balance: 50,
    price: 1.75,
    change24h: 3.8,
  },
  {
    symbol: 'SPACE-USDGLO',
    name: 'SPACE/USDGLO LP',
    tvl: 225000,
    balance: 75,
    price: 3.20,
    change24h: 4.5,
  },
  {
    symbol: 'CARBON-USDGLO',
    name: 'CARBON/USDGLO LP',
    tvl: 180000,
    balance: 60,
    price: 1.95,
    change24h: -2.1,
  }
];

const defaultTokens = [
  {
    symbol: 'USDGLO',
    name: 'Global Impact Dollar',
    balance: 1000,
    price: 1.00,
    change24h: 0.1,
  },
  {
    symbol: 'HAND',
    name: 'HAND Token',
    balance: 500,
    price: 2.15,
    change24h: 5.2,
    paired: 'USDGLO'
  },
  {
    symbol: 'CELO',
    name: 'Celo',
    balance: 250,
    price: 12.50,
    change24h: 3.8,
    paired: 'USDGLO'
  }
];

export const WalletTab: React.FC = () => {
  const { walletConnected, handBalance } = useGameStore();

  if (!walletConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-gray-300">
          Connect your wallet to access DeFi features
        </p>
      </div>
    );
  }

  const totalTVL = liquidityPairs.reduce((sum, pair) => sum + pair.tvl, 0);

  return (
    <div className="space-y-8">
      {/* TVL Overview */}
      <div className="bg-gradient-to-br from-emerald-900/40 to-purple-900/40 rounded-xl p-6 border border-emerald-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-emerald-400">Total Value Locked</h3>
          <ChartBar className="text-emerald-400" />
        </div>
        
        <div className="text-3xl font-bold text-emerald-400 mb-4">
          ${totalTVL.toLocaleString()} USDGLO
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">HAND Balance</div>
            <div className="text-xl font-bold text-emerald-400">
              {handBalance.balance} HAND
            </div>
          </div>
          
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Total Donated</div>
            <div className="text-xl font-bold text-purple-400">
              {handBalance.donated} HAND
            </div>
          </div>
        </div>
      </div>

      {/* Liquidity Pairs */}
      <div>
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">Liquidity Pairs</h3>
        <div className="space-y-4">
          {liquidityPairs.map((pair) => (
            <div 
              key={pair.symbol}
              className="bg-black/20 rounded-xl p-4 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Coins className="text-emerald-400" size={24} />
                  <div>
                    <div className="font-medium text-emerald-400">{pair.symbol}</div>
                    <div className="text-sm text-gray-400">{pair.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-200">
                    TVL: ${pair.tvl.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    Balance: {pair.balance} LP
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  ${pair.price.toLocaleString()}
                </div>
                <div className={`flex items-center gap-1 ${
                  pair.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {pair.change24h >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {Math.abs(pair.change24h)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Token Balances */}
      <div>
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">Token Balances</h3>
        <div className="space-y-4">
          {defaultTokens.map((token) => (
            <div 
              key={token.symbol}
              className="bg-black/20 rounded-xl p-4 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Coins className="text-emerald-400" size={24} />
                  <div>
                    <div className="font-medium text-emerald-400">{token.symbol}</div>
                    <div className="text-sm text-gray-400">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-200">
                    {token.balance.toLocaleString()} {token.symbol}
                  </div>
                  <div className="text-sm text-gray-400">
                    ≈ ${(token.balance * token.price).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  ${token.price.toLocaleString()}
                </div>
                <div className={`flex items-center gap-1 ${
                  token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {token.change24h >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {Math.abs(token.change24h)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};