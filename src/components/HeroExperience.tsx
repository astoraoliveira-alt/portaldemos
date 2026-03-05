import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AudioWaveSurface = () => {
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position;

            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);

                // Crie combinações de frequências orgânicas e tecnológicas
                // Combinando seno, cosseno e uma onda radial a partir do centro para dar a sensação de áudio 8D/Espacial
                const wave1 = Math.sin(x * 0.15 + t * 0.8) * 1.5;
                const wave2 = Math.cos(y * 0.15 - t * 0.6) * 1.5;
                const waveRadial = Math.sin(Math.sqrt(x * x + y * y) * 0.2 - t * 2) * 1.5;

                // Interação com o Mouse
                const mouseX = state.pointer.x * 40;
                // O ponteiro Y vai de -1 a 1, mas o plano está inclinado. Ajustamos para acompanhar melhor:
                const mouseY = state.pointer.y * 40;

                const dx = mouseX - x;
                const dy = mouseY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Uma forte ondulação baseada na proximidade do cursor (como se a voz movesse o som)
                const mouseRipple = Math.max(0, 18 - dist) * 0.25 * Math.sin(dist * 0.8 - t * 12);

                // Amplitude final é um mix ponderado
                const z = (wave1 + wave2 + waveRadial) * 0.8 + mouseRipple;
                positions.setZ(i, z);
            }
            positions.needsUpdate = true;
        }
    });

    return (
        <group position={[0, -6, -20]} rotation={[-Math.PI / 2.2, 0, 0]}>
            <points ref={pointsRef}>
                {/* Usamos muitos segmentos para manter fluidez */}
                <planeGeometry args={[120, 100, 100, 80]} />
                <pointsMaterial
                    color="#38bdf8"
                    size={0.12}
                    transparent
                    opacity={0.8}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

export const HeroExperience: React.FC = () => {
    const scrollToLab = () => {
        document.getElementById('voice-lab')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">

            {/* 3D Canvas Background (WebGL) */}
            <div className="absolute inset-0 z-0 bg-davos-bg">
                <Canvas camera={{ position: [0, 2, 8], fov: 60 }} dpr={[1, 2]}>
                    <fog attach="fog" color="#030712" near={15} far={40} />
                    <AudioWaveSurface />
                </Canvas>
            </div>

            {/* Content Layer (Front of Canvas) */}
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-500 drop-shadow-xl">
                        Converse com Agentes de Voz de IA
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto tracking-wide">
                        Escolha um cenário real e receba uma ligação da nossa inteligência em <span className="text-davos-accent font-medium glow-text">segundos.</span>
                    </p>
                </motion.div>

                {/* CTA Button isolated for pointer-events */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-16 pointer-events-auto"
                >
                    <button
                        onClick={scrollToLab}
                        className="group relative inline-flex items-center justify-center px-10 py-5 font-semibold text-davos-bg bg-gradient-to-r from-davos-accent to-[#7dd3fc] rounded-full overflow-hidden shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.7)] transition-all duration-300"
                    >
                        <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative text-lg tracking-widest uppercase font-bold">Ativar Agentes</span>
                    </button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
                onClick={scrollToLab}
            >
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Testar Agora</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[2px] h-12 bg-gradient-to-b from-davos-accent to-transparent rounded-full"
                />
            </motion.div>

            {/* Custom CSS for glowing text effect */}
            <style>{`
         .glow-text {
            text-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
         }
      `}</style>
        </section>
    );
};
