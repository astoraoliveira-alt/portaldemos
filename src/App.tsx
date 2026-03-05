import { useState } from 'react';
import { Header } from './components/Header';
import { HeroExperience } from './components/HeroExperience';
import { VoiceLab } from './components/VoiceLab';
import { AgentActivationModal } from './components/AgentActivationModal';
import { CallSimulation } from './components/CallSimulation';
import { Agent } from './data/agents';

// This URL should point to your n8n / auto-dialer webhook
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'https://example.com/webhook/voice-ai';

function App() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSimulationActive, setIsSimulationActive] = useState(false);

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAgent(null), 300); // clear after animation
  };

  const handleTriggerCall = async (data: { name: string; phone: string; assistantId: string }) => {
    // 1. Instantly transition to simulation UI
    setIsModalOpen(false);
    setIsSimulationActive(true);

    // 2. Fire the POST request without waiting visually (Fire and Forget or handle silently)
    try {
      console.log('Disparando chamada para webhook n8n:', data);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar requisição: ' + response.statusText);
      }

      // Request successful
      console.log('Chamada processada com sucesso via HTTP POST.');

    } catch (error) {
      console.error('Falha no webhook. (Silenciado para o usuário manter a ilusão da experiência)', error);
      // Optional: Add logic here to show a subtle toast error or fallback gracefully, 
      // but per requirements, we prioritize the aesthetic simulation flow.
    }
  };

  const handleEndSimulation = () => {
    setIsSimulationActive(false);
    setTimeout(() => setSelectedAgent(null), 300);
  };

  return (
    <div className="min-h-screen bg-davos-bg text-white selection:bg-davos-accent selection:text-davos-bg overflow-x-hidden">
      <Header />
      <main>
        {/* Full Viewport Dynamic Hero */}
        <HeroExperience />

        {/* Lab / Grid interactive mapping */}
        <VoiceLab onSelectAgent={handleSelectAgent} />
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 bg-davos-primary flex flex-col items-center justify-center text-center">
        <p className="text-gray-500 text-sm font-light">
          &copy; {new Date().getFullYear()} Davos Voice AI. Uma experiência de agentes interativos.
        </p>
      </footer>

      {/* Floating Modal for Activation */}
      <AgentActivationModal
        isOpen={isModalOpen}
        agent={selectedAgent}
        onClose={handleCloseModal}
        onSubmit={handleTriggerCall}
      />

      {/* Full-Screen Calling Simulation */}
      <CallSimulation
        isOpen={isSimulationActive}
        agent={selectedAgent}
        onEndCall={handleEndSimulation}
      />
    </div>
  );
}

export default App;
