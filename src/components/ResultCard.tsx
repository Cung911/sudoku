import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';

interface ResultCardProps {
    isOpen: boolean;
    onClose: () => void;
    difficulty: string;
    theme?: 'default' | 'glass';
}

const NEXT_STEPS = [
    "Take a deep breath and drink a glass of water.",
    "Look out the window and focus on a distant object for 2 minutes.",
    "Stretch your neck and shoulders.",
    "Write down 3 things you are grateful for today.",
    "Close your eyes and listen to the sounds around you for 1 minute.",
    "Do a quick doodle on a piece of paper.",
    "Stand up and do 5 jumping jacks.",
    "Put your phone down and walk around the room.",
];

export const ResultCard: React.FC<ResultCardProps> = ({ isOpen, onClose, difficulty, theme = 'default' }) => {
    const isGlass = theme === 'glass';
    const [suggestion, setSuggestion] = useState("");

    useEffect(() => {
        if (isOpen) {
            setSuggestion(NEXT_STEPS[Math.floor(Math.random() * NEXT_STEPS.length)]);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: isGlass ? ['#38bdf8', '#0ea5e9', '#f1f5f9'] : ['#B5EAD7', '#FFDAC1', '#E2F0CB']
            });
        }
    }, [isOpen, isGlass]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className={clsx(
                            "rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden transition-all duration-500",
                            isGlass ? "glass-morphism" : "bg-white"
                        )}
                    >
                        <div className={clsx(
                            "absolute top-0 left-0 w-full h-2 bg-gradient-to-r",
                            isGlass ? "from-cyan-400 via-blue-500 to-purple-600" : "from-pastel-green via-pastel-orange to-pastel-grey"
                        )} />

                        <div className="mb-6 flex justify-center">
                            <div className={clsx(
                                "p-4 rounded-full",
                                isGlass ? "bg-cyan-500/20" : "bg-pastel-green/30"
                            )}>
                                <CheckCircle size={48} className={isGlass ? "text-cyan-400" : "text-pastel-green text-green-600"} />
                            </div>
                        </div>

                        <h2 className={clsx("text-3xl font-bold mb-2", isGlass ? "text-white" : "text-gray-800")}>Well Done!</h2>
                        <p className={clsx("mb-6", isGlass ? "text-gray-400" : "text-gray-500")}>You cleared the {difficulty} level.</p>

                        <div className={clsx(
                            "p-6 rounded-2xl mb-8 border",
                            isGlass ? "bg-white/5 border-glass-border" : "bg-pastel-bg border-gray-100"
                        )}>
                            <p className={clsx("text-xs uppercase tracking-wider font-bold mb-2", isGlass ? "text-cyan-400" : "text-gray-400")}>What to do next</p>
                            <p className={clsx("text-lg font-medium leading-relaxed", isGlass ? "text-white" : "text-gray-700")}>"{suggestion}"</p>
                        </div>

                        <button
                            onClick={onClose}
                            className={clsx(
                                "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg",
                                isGlass ? "bg-cyan-600 text-white hover:glass-glow" : "bg-gray-900 text-white hover:bg-black"
                            )}
                        >
                            Back to Relaxing <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
