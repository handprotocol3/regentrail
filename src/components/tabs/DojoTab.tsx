import React, { useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { dojoSkills } from '../../data/dojo';
import { toast } from 'sonner';

export const DojoTab: React.FC = () => {
  const { skills, trainSkill, handBalance, addLog } = useGameStore();
  const [trainingSkills, setTrainingSkills] = useState<Record<string, boolean>>({});
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const [activeEffects, setActiveEffects] = useState<Record<string, boolean>>({});

  const handleTraining = async (skillId: string) => {
    const skill = dojoSkills.find(s => s.id === skillId);
    if (!skill) return;

    if (trainingSkills[skillId]) {
      toast.error('This skill is currently in training!');
      return;
    }

    if (cooldowns[skillId] && cooldowns[skillId] > Date.now()) {
      toast.error('This skill is in cooldown!');
      return;
    }

    if (handBalance.balance < skill.cost) {
      toast.error(`Not enough HAND tokens! Need ${skill.cost} 🖐️`);
      return;
    }

    const userSkill = skills.find(s => s.id === skillId);
    if (userSkill?.level >= 10) {
      toast.error('Skill already mastered!');
      return;
    }

    setTrainingSkills(prev => ({ ...prev, [skillId]: true }));
    setActiveEffects(prev => ({ ...prev, [skillId]: true }));

    const trainingSteps = [
      `Beginning ${skill.name} training session...`,
      `Focusing energy on ${skill.name} principles...`,
      `Deepening understanding of regenerative practices...`,
      `Mastering ${skill.name} techniques...`,
      `Training session complete!`
    ];

    for (const step of trainingSteps) {
      addLog(step);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    trainSkill(skillId);
    setTrainingSkills(prev => ({ ...prev, [skillId]: false }));

    const cooldownTime = Date.now() + 30000;
    setCooldowns(prev => ({ ...prev, [skillId]: cooldownTime }));

    setTimeout(() => {
      setActiveEffects(prev => ({ ...prev, [skillId]: false }));
    }, 1000);

    const timer = setInterval(() => {
      if (Date.now() >= cooldownTime) {
        setCooldowns(prev => ({ ...prev, [skillId]: 0 }));
        clearInterval(timer);
      }
    }, 1000);
  };

  const getCooldownText = (skillId: string) => {
    const cooldown = cooldowns[skillId];
    if (!cooldown || cooldown <= Date.now()) return null;
    const seconds = Math.ceil((cooldown - Date.now()) / 1000);
    return `${seconds}s`;
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-emerald-400">Training Dojo</h2>
          <div className="text-sm text-emerald-300">
            Available HAND: {handBalance.balance} 🖐️
          </div>
        </div>
        <p className="text-gray-400 mb-4">
          Train your regenerative skills to earn points and level up. Each training session requires HAND tokens and has a cooldown period.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {dojoSkills.map((skill) => {
          const userSkill = skills.find(s => s.id === skill.id) || { level: 0, experience: 0 };
          const progress = (userSkill.experience / (userSkill.level + 1) * 100) || 0;
          const isTraining = trainingSkills[skill.id];
          const cooldownText = getCooldownText(skill.id);
          const isActive = activeEffects[skill.id];

          return (
            <div 
              key={skill.id} 
              className={`dojo-card group relative overflow-hidden transition-all duration-300 ${
                isActive ? 'animate-pulse ring-2 ring-emerald-400/50' : ''
              }`}
            >
              {isTraining && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-emerald-400/10 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-emerald-400 animate-spin" size={32} />
                  </div>
                </div>
              )}

              <h3 className="text-xl font-semibold text-emerald-400 mb-2 group-hover:scale-105 transition-transform relative z-10">
                {skill.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4 relative z-10">{skill.description}</p>
              
              <div className="flex justify-between text-sm text-gray-300 mb-2 relative z-10">
                <span>Level {userSkill.level}/10</span>
                <span>{Math.round(progress)}%</span>
              </div>
              
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4 relative z-10">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <button
                onClick={() => handleTraining(skill.id)}
                disabled={isTraining || !!cooldownText || handBalance.balance < skill.cost || userSkill.level >= 10}
                className={`glass-button w-full flex items-center justify-center gap-2 relative z-10 ${
                  isTraining 
                    ? 'bg-emerald-500/20 cursor-not-allowed'
                    : cooldownText
                    ? 'bg-gray-500/20 cursor-not-allowed'
                    : handBalance.balance < skill.cost || userSkill.level >= 10
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-emerald-500/20 hover:scale-105'
                }`}
              >
                {isTraining ? (
                  <span className="flex items-center gap-2">
                    <Clock className="animate-spin" size={16} />
                    Training...
                  </span>
                ) : cooldownText ? (
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    Cooldown {cooldownText}
                  </span>
                ) : (
                  `Train (${skill.cost} 🖐️)`
                )}
              </button>

              {isActive && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `particle-float-${i} 2s ease-in-out infinite`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};