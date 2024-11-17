import React, { useEffect, useRef } from 'react';
import { Trophy, User as UserIcon } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export const Leaderboard: React.FC = () => {
  const { getLeaderboard, currentUser } = useUserStore();
  const leaderboard = getLeaderboard();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && leaderboard.length > 3) {
      let scrollPos = 0;
      const maxScroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      
      const scroll = () => {
        if (scrollRef.current) {
          scrollPos = (scrollPos + 1) % (maxScroll + 100);
          scrollRef.current.scrollTop = scrollPos;
          
          if (scrollPos >= maxScroll) {
            setTimeout(() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTop = 0;
                scrollPos = 0;
              }
            }, 1000);
          }
        }
      };

      const interval = setInterval(scroll, 50);
      return () => clearInterval(interval);
    }
  }, [leaderboard.length]);

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-emerald-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-emerald-400" size={20} />
        <h3 className="text-lg font-semibold text-emerald-400">Top Regenerators</h3>
      </div>

      <div 
        ref={scrollRef}
        className="space-y-2 max-h-[120px] overflow-hidden"
      >
        {leaderboard.map((user, index) => {
          const totalPoints = Object.values(user.points).reduce((sum, val) => sum + val, 0);
          const isCurrentUser = user.id === currentUser?.id;

          return (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                isCurrentUser ? 'bg-emerald-500/20' : 'bg-black/20'
              }`}
            >
              <div className="w-5 text-center font-bold text-emerald-400">
                {index + 1}
              </div>
              
              <div className="flex-1 truncate">
                <div className="flex items-center gap-2">
                  <UserIcon size={14} className="text-emerald-400 shrink-0" />
                  <span className={`font-medium truncate ${isCurrentUser ? 'text-emerald-400' : 'text-gray-300'}`}>
                    {user.username || 'Anonymous Regenerator'}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-bold text-emerald-400">{totalPoints}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};