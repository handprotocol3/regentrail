import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { featuredProjects } from '../../data/projects';
import { Heart, ExternalLink, Gift } from 'lucide-react';
import { toast } from 'sonner';

export const ProjectsTab: React.FC = () => {
  const { donateToProject, wallet, walletConnected, completeDonationRound } = useGameStore();

  const handleDonate = async (projectId: string, amount: number) => {
    if (!walletConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (wallet.balances.USDGLO < amount) {
      toast.error('Insufficient USDGLO balance');
      return;
    }

    await donateToProject(projectId, amount);
    completeDonationRound();
    
    toast.success(
      <div className="space-y-2">
        <div>Donation Complete! 🎉</div>
        <div className="text-sm text-gray-400">
          Check your HyperCerts in the CookieJar tab!
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-400">Featured Projects</h2>
          <p className="text-gray-300 text-sm">Support regenerative projects with USDGLO</p>
        </div>
        <div className="text-right">
          <div className="text-emerald-400 font-bold">
            {wallet.balances.USDGLO.toFixed(2)} USDGLO
          </div>
          <div className="text-sm text-gray-400">Available Balance</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-emerald-400">
                  {project.name}
                </h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-emerald-400">
                    {project.raised} USDGLO
                  </span> raised
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Heart size={16} className="text-pink-400" />
                  {project.supporters} supporters
                </div>
              </div>

              <div className="flex gap-2">
                {[3, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleDonate(project.id, amount)}
                    className="action-button flex-1 px-4 py-2 text-emerald-400 font-medium group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {amount} USDGLO
                      <Gift className="group-hover:rotate-12 transition-transform" size={16} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};