import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { locations } from '../data/locations';
import { ChevronLeft, Map, Gift, CheckCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface TravelModalProps {
  locationId: string;
  travelText: string;
  onComplete: () => void;
}

export const TravelModal: React.FC<TravelModalProps> = ({ locationId, travelText, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showActivities, setShowActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [activityStory, setActivityStory] = useState<string[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showMintModal, setShowMintModal] = useState(false);
  const [activityProgress, setActivityProgress] = useState(0);
  const { markActivityComplete, isActivityCompleted, addLog } = useGameStore();

  const location = locations[locationId];
  const activity = location?.activities?.find(a => a.id === selectedActivity);

  useEffect(() => {
    if (!showActivities) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setShowActivities(true), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [showActivities]);

  useEffect(() => {
    if (selectedActivity && activity) {
      setActivityStory(activity.story || []);
      setCurrentStoryIndex(0);
      setActivityProgress(0);
    }
  }, [selectedActivity, activity]);

  useEffect(() => {
    if (activityStory.length > 0) {
      setActivityProgress((currentStoryIndex / activityStory.length) * 100);
    }
  }, [currentStoryIndex, activityStory.length]);

  const handleActivitySelect = (activityId: string) => {
    const isCompleted = isActivityCompleted(locationId, activityId);
    if (isCompleted) {
      toast.info("Already completed this activity!", {
        description: "Click the refresh icon to start again!"
      });
      return;
    }
    setSelectedActivity(activityId);
  };

  const handleContinue = () => {
    if (currentStoryIndex < activityStory.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      if (selectedActivity) {
        markActivityComplete(locationId, selectedActivity);
        setShowMintModal(true);
      }
    }
  };

  const handleMintHyperCert = () => {
    if (activity) {
      toast.success(
        <div className="space-y-2">
          <div>Activity Complete! 🎉</div>
          <div className="text-sm text-gray-400">
            {activity.name} has been marked as completed
          </div>
        </div>
      );
      addLog(`Completed ${activity.name} at ${location.name}`);
    }
    setShowMintModal(false);
    setSelectedActivity(null);
    setActivityStory([]);
    setCurrentStoryIndex(0);
  };

  const handleRestartActivity = (activityId: string) => {
    setSelectedActivity(activityId);
    setActivityProgress(0);
    setCurrentStoryIndex(0);
    toast.success("Starting activity again! 🔄");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-gradient-to-br from-emerald-900/90 to-purple-900/90 rounded-xl max-w-2xl w-full border border-emerald-500/20">
        {!showActivities ? (
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Map className="text-emerald-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold text-emerald-400">Traveling to {location.name}</h3>
                <p className="text-gray-300">{travelText}</p>
              </div>
            </div>

            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : showMintModal ? (
          <div className="p-8 space-y-6">
            <div className="text-center">
              <Gift size={48} className="text-emerald-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">
                Activity Complete! 🎉
              </h3>
              <p className="text-gray-300 mb-6">
                Would you like to mark this activity as completed?
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={handleMintHyperCert}
                  className="action-button px-6 py-2 text-emerald-400 flex-1"
                >
                  Complete Activity
                </button>
                <button
                  onClick={() => {
                    setShowMintModal(false);
                    setSelectedActivity(null);
                    setActivityStory([]);
                    setCurrentStoryIndex(0);
                  }}
                  className="px-6 py-2 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        ) : selectedActivity ? (
          <div className="p-8 space-y-6">
            <button
              onClick={() => setSelectedActivity(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <ChevronLeft size={20} />
              Back to activities
            </button>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-emerald-400">
                {activity?.name}
              </h3>
              
              <div className="h-2 bg-black/20 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${activityProgress}%` }}
                />
              </div>

              <div className="bg-black/20 p-6 rounded-lg border border-emerald-500/10">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {activityStory[currentStoryIndex]}
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="action-button px-6 py-2 text-emerald-400 w-full"
              >
                {currentStoryIndex < activityStory.length - 1 ? 'Continue... ⏭️' : 'Complete Activity 🎉'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-emerald-400">Available Activities</h3>
              <button
                onClick={onComplete}
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Return to Base Camp
              </button>
            </div>

            <div className="space-y-4">
              {location.activities?.map((activity) => {
                const completed = isActivityCompleted(locationId, activity.id);
                return (
                  <div
                    key={activity.id}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 bg-black/20 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20 ${
                      completed ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                        {activity.name}
                        {completed && <CheckCircle size={20} className="text-green-400" />}
                      </h4>
                    </div>
                    <p className="text-gray-300 mb-4">{activity.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleActivitySelect(activity.id)}
                        className={`action-button px-6 py-2 font-medium flex-1 ${
                          completed ? 'text-gray-400' : 'text-emerald-400'
                        }`}
                      >
                        {completed ? "Already completed!" : "Let's get going!"}
                      </button>
                      {completed && (
                        <button
                          onClick={() => handleRestartActivity(activity.id)}
                          className="action-button px-4 py-2 text-emerald-400"
                          title="Go again"
                        >
                          <RefreshCw size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};