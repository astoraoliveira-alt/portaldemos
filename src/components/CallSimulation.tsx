import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent } from '../data/agents';
import { PhoneOff } from 'lucide-react';

interface CallSimulationProps {
    isOpen: boolean;
    agent: Agent | null;
    onEndCall: () => void;
}

export const CallSimulation: React.FC<CallSimulationProps> = ({ isOpen, agent, onEndCall }) => {
    const [callState, setCallState] = useState<'connecting' | 'calling'>('connecting');

    useEffect(() => {
        if (isOpen) {
            setCallState('connecting');

            // Starts calling after 3.5 seconds
            const callingTimer = setTimeout(() => {
                setCallState('calling');
            }, 3500);

            // Automatically closes the simulation 10 seconds after it starts "calling"
            const endTimer = setTimeout(() => {
                onEndCall();
            }, 13500); // 3500ms + 10000ms

            return () => {
                clearTimeout(callingTimer);
                clearTimeout(endTimer);
            };
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && agent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 bg-davos-bg z-50 flex flex-col items-center justify-between py-20 px-6 sm:px-10"
                >
                    {/* Top section: Status */}
                    <div className="w-full flex justify-center pt-10">
                        <motion.div
                            animate={{ opacity: callState === 'connecting' ? [0.4, 1, 0.4] : 1 }}
                            transition={{ duration: 1.5, repeat: callState === 'connecting' ? Infinity : 0 }}
                            className="text-gray-400 tracking-wider uppercase text-sm font-medium"
                        >
                            {callState === 'connecting' ? '' : 'Seu agente está ligando para você agora.'}
                        </motion.div>
                    </div>

                    {/* Center section: Avatar & Name */}
                    <div className="flex flex-col items-center flex-grow justify-center -mt-10">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="relative"
                        >
                            {/* Pulsing ring */}
                            {callState === 'calling' && (
                                <motion.div
                                    initial={{ opacity: 0.6, scale: 1 }}
                                    animate={{ opacity: 0, scale: 1.6 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                                    className="absolute inset-0 bg-davos-accent rounded-full -z-10"
                                />
                            )}

                            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full flex items-center justify-center p-[2px] shadow-2xl relative z-10 overflow-hidden">
                                <div
                                    className="w-full h-full bg-davos-bg rounded-full bg-cover bg-center border border-white/5"
                                    style={{ backgroundImage: `url(${agent.image})` }}
                                />
                            </div>
                        </motion.div>

                        <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-2 tracking-tight text-white text-center">
                            {agent.name}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 font-light flex items-center space-x-2">
                            {callState === 'calling' ? (
                                <>
                                    <span className="text-emerald-400 font-medium">Iniciando chamada...</span>
                                </>
                            ) : (
                                <span>Conectando com o agente...</span>
                            )}
                        </p>

                        {/* Simulated Voice Waves mapping when 'calling' */}
                        {callState === 'calling' && (
                            <div className="flex items-center justify-center space-x-1.5 h-16 mt-16 opacity-80">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <motion.div
                                        key={`sim-${i}`}
                                        className="w-1.5 bg-[#7dd3fc] rounded-full"
                                        animate={{
                                            height: [
                                                `${Math.max(10, Math.random() * 20)}px`,
                                                `${Math.max(20, Math.random() * 64)}px`,
                                                `${Math.max(10, Math.random() * 20)}px`,
                                            ],
                                        }}
                                        transition={{
                                            duration: Math.random() * 0.8 + 0.4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        {callState === 'connecting' && (
                            <div className="flex items-center justify-center h-16 mt-16 text-xs text-gray-600 font-mono tracking-widest">
                                [ AGUARDANDO RETORNO ]
                            </div>
                        )}
                    </div>

                    {/* Bottom section: End Call Button */}
                    <div className="w-full flex justify-center pb-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onEndCall}
                            className="w-20 h-20 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-colors"
                        >
                            <PhoneOff size={32} />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
