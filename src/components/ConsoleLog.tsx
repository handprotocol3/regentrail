import React, { useEffect, useRef } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

interface ConsoleLogProps {
  logs: string[];
  onProposalClick: () => void;
}

export const ConsoleLog: React.FC<ConsoleLogProps> = ({ logs, onProposalClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isGlowing, setIsGlowing] = React.useState(false);
  const prevLogsLength = useRef(logs.length);
  const [currentSubmission, setCurrentSubmission] = React.useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (logs.length > prevLogsLength.current) {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1000);

      // Check for KarmaGap submissions
      const lastLog = logs[logs.length - 1];
      if (lastLog.includes('KarmaGap')) {
        setCurrentSubmission(lastLog);
        setTimeout(() => setCurrentSubmission(null), 3000);
      }
    }
    prevLogsLength.current = logs.length;
  }, [logs]);

  return (
    <div className="space-y-4">
      <div className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-shadow duration-300 ${
        isGlowing ? 'shadow-lg shadow-emerald-500/20' : ''
      }`}>
        <div className="px-4 py-2 bg-gray-900 flex items-center gap-2 border-b border-gray-700">
          <Terminal size={16} className="text-emerald-400" />
          <span className="text-sm text-gray-300">Adventure Log</span>
        </div>
        <div
          ref={scrollRef}
          className="p-4 h-48 overflow-y-auto font-mono text-sm space-y-2"
        >
          {logs.map((log, index) => (
            <div key={index} className="text-emerald-400">
              <span className="text-gray-500">&gt;</span> {log}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/80 rounded-lg overflow-hidden border border-purple-700/30 backdrop-blur-sm">
        <div className="px-4 py-2 bg-purple-900/50 flex items-center gap-2 border-b border-purple-700/30">
          <span className="text-2xl">🍄</span>
          <span className="text-sm text-purple-200">DAO Governance</span>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-purple-200">Active Proposals</span>
              <span className="text-purple-400">3</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-purple-200">Your Voting Power</span>
              <span className="text-purple-400">1.5x</span>
            </div>
          </div>

          <div className="border-t border-purple-700/30 pt-4">
            <div className="text-sm text-purple-200 mb-2">KarmaGap Submissions</div>
            {currentSubmission ? (
              <div className="bg-purple-500/20 p-3 rounded-lg text-sm text-purple-200 animate-pulse">
                <div className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-purple-400" />
                  {currentSubmission}
                </div>
              </div>
            ) : (
              <div className="text-sm text-purple-400/60 italic">
                Awaiting next submission...
              </div>
            )}
          </div>

          <button 
            onClick={onProposalClick}
            className="glass-button w-full border-purple-500/20 hover:bg-purple-500/20 text-purple-200"
          >
            View Proposals
          </button>
        </div>
      </div>
    </div>
  );
};