import React from 'react';
import { Wallet } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const ConnectWallet: React.FC = () => {
  const { connectWallet, walletConnected, walletAddress } = useGameStore();

  return (
    <button
      onClick={connectWallet}
      className={`action-button px-6 py-2 flex items-center gap-2 group ${
        walletConnected ? 'bg-emerald-600/20 border-emerald-500/30' : ''
      }`}
    >
      <Wallet 
        size={18} 
        className={`${walletConnected ? 'text-emerald-400' : ''} group-hover:rotate-12 transition-transform`} 
      />
      {walletConnected ? (
        <span className="text-emerald-400">Connected</span>
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
};