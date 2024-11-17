import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ArrowUp, ArrowDown, Coins, Lock, Wallet } from 'lucide-react';

const defaultTokens = [
  {
    symbol: 'USDGLO',
    name: 'Global Impact Dollar',
    balance: 1000,
    price: 1.00,
    change24h: 0.1,
  },
  {
    symbol: 'SHAND',
    name: 'Staked HAND',
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
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 0.5,
    price: 4200.00,
    change24h: -2.1,
    paired: 'USDGLO'
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.02,
    price: 65000.00,
    change24h: 1.5,
    paired: 'USDGLO'
  }
];

export const WalletTab: React.FC = () => {
  const { walletConnected } = useGameStore();

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

  const treasury = {
    balance: 1000000,
    locked: 750000
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-emerald-900/40 to-purple-900/40 rounded-xl p-6 border border-emerald-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-emerald-400">Treasury</h3>
          <Lock className="text-emerald-400" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Available</div>
            <div className="text-2xl font-bold text-emerald-400">
              {treasury.balance.toLocaleString()} USDGLO
            </div>
          </div>
          
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Locked</div>
            <div className="text-2xl font-bold text-purple-400">
              {treasury.locked.toLocaleString()} USDGLO
            </div>
          </div>
        </div>
      </div>

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

            {token.paired && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                  Paired with {token.paired}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};