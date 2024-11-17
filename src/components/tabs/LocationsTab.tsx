import React, { useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { LocationCard } from '../LocationCard';
import { QuestList } from '../QuestList';
import { TravelModal } from '../TravelModal';
import { locations } from '../../data/locations';
import { useGameStore } from '../../store/gameStore';

export const LocationsTab: React.FC = () => {
  const { currentLocation, setLocation } = useGameStore();
  const [isTraveling, setIsTraveling] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const handleTravel = (locationId: string) => {
    if (locationId === currentLocation) {
      // Already at this location, just show activities
      setSelectedLocationId(locationId);
      setIsTraveling(true);
      return;
    }

    setSelectedLocationId(locationId);
    setIsTraveling(true);
  };

  const handleTravelComplete = () => {
    if (selectedLocationId && selectedLocationId !== currentLocation) {
      setLocation(selectedLocationId);
    }
    setIsTraveling(false);
    setSelectedLocationId(null);
  };

  const activeLocation = locations[currentLocation as keyof typeof locations];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Next Stops</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(locations).map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={() => handleTravel(location.id)}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-500/10 rounded-lg">
            <MapIcon className="text-emerald-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-emerald-400">
              {activeLocation.name}
            </h2>
            <p className="text-sm text-gray-400">Current Location</p>
          </div>
        </div>
        
        {activeLocation.storyIntro && (
          <div className="mb-6 bg-black/20 rounded-lg p-4 border border-emerald-500/10">
            <p className="text-lg text-gray-300 italic">
              {activeLocation.storyIntro}
            </p>
          </div>
        )}
        
        <div className="bg-gray-900/50 rounded-lg p-4">
          <QuestList quests={activeLocation.quests} />
        </div>
      </section>

      {isTraveling && selectedLocationId && (
        <TravelModal
          locationId={selectedLocationId}
          travelText={locations[selectedLocationId].travelText}
          onComplete={handleTravelComplete}
        />
      )}
    </div>
  );
};