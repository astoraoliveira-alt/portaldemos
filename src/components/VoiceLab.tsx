import React from 'react';
import { motion } from 'framer-motion';
import { agents, Agent } from '../data/agents';
import { AgentModule } from './AgentModule';

interface VoiceLabProps {
    onSelectAgent: (agent: Agent) => void;
}

export const VoiceLab: React.FC<VoiceLabProps> = ({ onSelectAgent }) => {
    return (
        <section id="voice-lab" className="relative py-24 md:py-32 px-6 flex flex-col items-center bg-davos-bg overflow-hidden border-t border-white/5 min-h-screen justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-davos-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl w-full flex flex-col h-full justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight text-white">
                        Laboratório de <span className="text-davos-accent">Agentes de Voz</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        Escolha um cenário real e ative um agente de IA treinado para situações do mundo real.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    {agents.map((agent, index) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <AgentModule agent={agent} onClick={onSelectAgent} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
