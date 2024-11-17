import React from 'react';
import { useGameStore } from '../store/gameStore';
import { storeItems } from '../data/store';
import { toast } from 'sonner';
import { Glasses } from 'lucide-react';

export const Store: React.FC = () => {
  const { handBalance, purchaseItem, points } = useGameStore();

  const handlePurchase = (item: typeof storeItems[0]) => {
    if (points.space < item.spaceRequired) {
      toast.error(
        <div className="flex flex-col gap-2">
          <div>Not enough $SPACE tokens!</div>
          <div className="flex items-center gap-2 text-sm bg-black/20 p-2 rounded-lg">
            <Glasses className="text-purple-400" size={16} />
            <span>
              Tip: Visit Tom at NounSpace to get some n0gs and earn $SPACE tokens!
            </span>
          </div>
        </div>
      );
      return;
    }

    if (handBalance.balance >= item.cost) {
      purchaseItem(item);
      toast.success(`Purchased ${item.name}!`, {
        description: `Added to your inventory. You earned ${Object.entries(item.points)
          .map(([key, value]) => `${value} ${key}`)
          .join(', ')}`,
      });
    } else {
      toast.error('Not enough HAND tokens!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Regenerative Store</h2>
        <p className="text-gray-400 mb-4">Purchase sustainable items using your HAND tokens to earn points and support the regenerative economy.</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-emerald-600">Available: {handBalance.balance} 🖐️</div>
          <div className="text-sm text-purple-400">$SPACE: {points.space}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storeItems.map((item) => (
          <div key={item.id} className="project-card p-4 hover:scale-105 transition-all duration-300">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg text-emerald-400">{item.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-lg font-medium text-emerald-300">{item.cost} 🖐️</span>
                <div className="text-sm text-purple-400">Required: {item.spaceRequired} $SPACE</div>
              </div>
              <button
                onClick={() => handlePurchase(item)}
                className="action-button px-4 py-2 text-emerald-400"
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>

      {points.space === 0 && (
        <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Glasses size={24} className="text-purple-400" />
            <h3 className="text-xl font-semibold text-purple-400">Need $SPACE?</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Head over to NounSpace and chat with Tom! He'll hook you up with some n0gs 
            and help you earn $SPACE tokens for the store.
          </p>
          <button className="action-button px-6 py-2 text-purple-400 w-full group">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Visit NounSpace
              <Glasses className="group-hover:animate-bounce" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};