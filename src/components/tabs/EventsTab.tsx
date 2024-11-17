import React, { useState } from 'react';
import { Calendar, Users, X, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { events } from '../../data/events';
import { toast } from 'sonner';

export const EventsTab: React.FC = () => {
  const { addPoints, addLog } = useGameStore();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleRSVP = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    toast.success(`RSVP'd to ${event.name}!`, {
      description: 'See you there, fellow regenerator! 🌱'
    });

    addPoints({ hand: 10, earth: 5 });
    addLog(`RSVP'd to ${event.name}`);
    setSelectedEvent(null);
  };

  const event = events.find(e => e.id === selectedEvent);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-emerald-400 mb-2">Upcoming Events</h2>
        <p className="text-gray-300">Join the regenerative movement at these upcoming events!</p>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event.id} className="project-card overflow-hidden group">
            <div className="relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-xl font-bold text-emerald-400">{event.name}</h3>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-300">{event.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Users size={16} />
                  <span>{event.attendees} attending</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(event.id)}
                    className="action-button px-6 py-2 text-emerald-400 font-medium"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleRSVP(event.id)}
                    className="action-button px-6 py-2 text-emerald-400 font-medium"
                  >
                    RSVP
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && event && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-emerald-900/90 to-purple-900/90 rounded-xl max-w-2xl w-full border border-emerald-500/20">
            <div className="relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent" />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">{event.name}</h3>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">{event.description}</p>
                {event.schedule && (
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-2">Schedule</h4>
                    <div className="space-y-2">
                      {event.schedule.map((item, index) => (
                        <div key={index} className="flex gap-4 text-gray-300">
                          <Clock size={16} className="shrink-0 mt-1" />
                          <div>
                            <div className="font-medium">{item.time}</div>
                            <div className="text-sm text-gray-400">{item.activity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleRSVP(event.id)}
                  className="action-button px-8 py-3 text-emerald-400 font-medium flex-1"
                >
                  RSVP Now
                </button>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button px-4 py-3 text-emerald-400"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};