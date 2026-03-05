import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Linkedin, Instagram, Globe } from 'lucide-react';
import { cn } from '../utils/cn';

export const Header: React.FC = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            if (!isScrolled) setIsScrolled(true);
        } else {
            if (isScrolled) setIsScrolled(false);
        }
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300",
                isScrolled ? "bg-davos-bg/70 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
            )}
        >
            {/* Brand logo */}
            <div className="flex items-center">
                <span className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                    DAVOS
                </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
                <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={20} strokeWidth={1.5} />
                </motion.a>

                <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                    aria-label="Instagram"
                >
                    <Instagram size={20} strokeWidth={1.5} />
                </motion.a>

                <motion.a
                    href="https://www.davosconsulting.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                    aria-label="Website Oficial"
                >
                    <Globe size={20} strokeWidth={1.5} />
                </motion.a>
            </div>
        </motion.header>
    );
};
