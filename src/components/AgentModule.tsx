import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '../data/agents';
import { cn } from '../utils/cn';

interface AgentModuleProps {
    agent: Agent;
    onClick: (agent: Agent) => void;
}

export const AgentModule: React.FC<AgentModuleProps> = ({ agent, onClick }) => {
    return (
        <motion.div
            onClick={() => onClick(agent)}
            whileHover="hover"
            className={cn(
                "group relative cursor-pointer overflow-hidden p-[1px] rounded-2xl transition-all duration-300",
                "h-full flex flex-col",
                "bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl",
                "hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
            )}
        >
            {/* Dynamic Border Glow */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-b from-davos-accent to-davos-primary opacity-0 rounded-2xl"
                variants={{
                    hover: { opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Dark Inner Body */}
            <div className="relative z-10 flex flex-col h-full bg-davos-bg rounded-[15px] overflow-hidden">

                {/* Top: Image Container (approx 45%, max ~200px) */}
                <div className="relative w-full h-[140px] sm:h-[160px] overflow-hidden bg-davos-primary shrink-0">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${agent.image})` }}
                        variants={{
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    {/* Subtle gradient to blend into the content area below */}
                    <div className="absolute inset-0 bg-gradient-to-t from-davos-bg to-transparent opacity-80" />
                </div>

                {/* Middle: Content Body (approx 35%) */}
                <div className="flex flex-col flex-grow px-5 py-4 z-20">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:text-davos-accent transition-all duration-300">
                        {agent.name}
                    </h3>

                    <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed">
                        {agent.description}
                    </p>
                </div>

                {/* Bottom: CTA Button (approx 20%) */}
                <div className="px-5 pb-5 pt-0 mt-auto z-20">
                    <motion.div
                        variants={{
                            hover: { y: -2 }
                        }}
                        transition={{ duration: 0.2 }}
                        className="w-full flex"
                    >
                        <button
                            className="w-full py-2.5 px-3 border border-white/10 rounded-xl text-[13px] font-semibold tracking-wide text-white bg-white/5 backdrop-blur-sm transition-colors duration-300 group-hover:bg-davos-accent/15 group-hover:border-davos-accent/40 shadow-sm"
                        >
                            Testar Cenário
                        </button>
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
};
