import React, { useState } from 'react';
import { Cookie, ArrowRight, Gift } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { toast } from 'sonner';

export const CookieJarTab: React.FC = () => {
  const { wallet, addGloDollars, donationRound, completeDonationRound } = useGameStore();
  const [isCollecting, setIsCollecting] = useState(false);

  const handleCollectGlo = async () => {
    setIsCollecting(true);
    
    // Base amount is $3, increases by $1 each round
    const amount = 3 + (donationRound * 1);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    addGloDollars(amount);
    
    toast.success(
      <div className="space-y-2">
        <div>Collected {amount} USDGLO! 🍪</div>
        <div className="text-sm text-gray-400">
          Head over to the Projects tab to make your impact!
        </div>
      </div>
    );
    
    setIsCollecting(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-emerald-900/40 to-purple-900/40 rounded-xl p-8 border border-emerald-500/20">
        <div className="flex items-center gap-4 mb-6">
          <Cookie size={32} className="text-emerald-400" />
          <div>
            <h2 className="text-2xl font-bold text-emerald-400">nCookieJar</h2>
            <p className="text-gray-300">Collect GLO to support regenerative projects</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/20 rounded-lg p-6 border border-emerald-500/10">
            <div className="text-sm text-gray-400 mb-2">Current Round</div>
            <div className="text-3xl font-bold text-emerald-400 mb-4">
              Round {donationRound + 1}
            </div>
            <div className="text-sm text-gray-300">
              Collect {3 + (donationRound * 1)} USDGLO this round
            </div>
          </div>

          <div className="bg-black/20 rounded-lg p-6 border border-emerald-500/10">
            <div className="text-sm text-gray-400 mb-2">Your USDGLO Balance</div>
            <div className="text-3xl font-bold text-emerald-400 mb-4">
              {wallet.balances.USDGLO.toFixed(2)} USDGLO
            </div>
            <div className="text-sm text-gray-300">
              Ready to make an impact
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleCollectGlo}
            disabled={isCollecting}
            className="action-button w-full py-4 text-lg group disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isCollecting ? (
                <>
                  <Cookie className="animate-spin" />
                  Collecting GLO...
                </>
              ) : (
                <>
                  Collect GLO
                  <Cookie className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </span>
          </button>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <ArrowRight size={16} />
            <span>Collect GLO and donate to earn HyperCerts!</span>
          </div>
        </div>
      </div>

      {/* HyperCerts Section */}
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="text-purple-400" size={24} />
          <h3 className="text-xl font-semibold text-purple-400">Your HyperCerts</h3>
        </div>

        <div className="space-y-4">
          {Array.from({ length: donationRound }).map((_, index) => (
            <div
              key={index}
              className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20"
            >
              <div className="font-medium text-purple-400 mb-1">
                Round {index + 1} Donation Complete
              </div>
              <div className="text-sm text-gray-400">
                Contributed to the regenerative economy
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};