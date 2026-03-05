import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent } from '../data/agents';
import { User, Phone, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface AgentActivationModalProps {
    isOpen: boolean;
    agent: Agent | null;
    onClose: () => void;
    onSubmit: (data: { name: string; phone: string; assistantId: string }) => void;
}

const maskPhone = (value: string) => {
    // Allow only digits
    const v = value.replace(/\D/g, '');
    // Format (XX) XXXXX-XXXX
    if (v.length <= 2) return v;
    if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
};

const unmaskPhone = (value: string) => {
    // Extract number strings only for the POST request
    return value.replace(/\D/g, '');
};

const ModalWaveform = () => (
    <div className="flex items-center justify-center space-x-1 h-8 opacity-80 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
                key={i}
                className="w-1 bg-davos-accent rounded-full"
                animate={{
                    height: [
                        `${Math.max(4, Math.random() * 24)}px`,
                        `${Math.max(8, Math.random() * 32)}px`,
                        `${Math.max(4, Math.random() * 24)}px`,
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
);

export const AgentActivationModal: React.FC<AgentActivationModalProps> = ({
    isOpen,
    agent,
    onClose,
    onSubmit
}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(maskPhone(e.target.value));
        if (error) setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Por favor, informe seu nome.');
            return;
        }

        const plainPhone = unmaskPhone(phone);
        if (plainPhone.length < 10) {
            setError('Por favor, informe um telefone válido com DDD.');
            return;
        }

        setIsSubmitting(true);

        // Slight artificial delay before returning execution to give realistic feedback
        setTimeout(() => {
            setIsSubmitting(false);
            if (agent) {
                onSubmit({
                    name: name.trim(),
                    phone: plainPhone,
                    assistantId: agent.id
                });

                // Reset form
                setName('');
                setPhone('');
                setError('');
            }
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && agent && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
                    />

                    <motion.div
                        key="modal-content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 pointer-events-none"
                    >
                        {/* Inner box that receives pointer events */}
                        <div className="bg-davos-primary border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden pointer-events-auto shadow-[0_20px_60px_-15px_rgba(56,189,248,0.2)]">

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>

                            <div className="flex flex-col items-center mb-8">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-[2px] mb-6 shadow-[0_0_20px_rgba(56,189,248,0.3)] bg-gradient-to-tr from-davos-accent to-davos-primary overflow-hidden">
                                    <div
                                        className="w-full h-full bg-davos-bg rounded-full bg-cover bg-center border border-white/5"
                                        style={{ backgroundImage: `url(${agent.image})` }}
                                    />
                                </div>

                                <h3 className="text-2xl font-bold tracking-tight text-white mb-2 text-center">
                                    {agent.name}
                                </h3>

                                <div className="text-center text-sm text-davos-accent font-medium mb-2">
                                    {agent.description}
                                </div>

                                <ModalWaveform />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <User size={18} strokeWidth={1.5} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Seu nome"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                if (error) setError('');
                                            }}
                                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-davos-bg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-davos-accent focus:border-davos-accent transition-all duration-300 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Phone size={18} strokeWidth={1.5} />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="(11) 99999-9999"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-davos-bg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-davos-accent focus:border-davos-accent transition-all duration-300 sm:text-sm"
                                        />
                                    </div>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-red-400 text-xs mt-2 pl-1 font-medium"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        type="submit"
                                        className={cn(
                                            "w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold tracking-wide text-davos-bg bg-white focus:outline-none transition-all duration-300",
                                            isSubmitting ? "opacity-70 cursor-wait" : "hover:bg-davos-accent hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                                        )}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center space-x-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                    className="w-4 h-4 border-2 border-davos-bg border-t-transparent rounded-full"
                                                />
                                                <span>Processando...</span>
                                            </span>
                                        ) : (
                                            "Receber ligação do agente"
                                        )}
                                    </motion.button>
                                </div>
                            </form>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
