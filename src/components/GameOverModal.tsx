import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

interface GameOverModalProps {
    isOpen: boolean;
    onReset: () => void;
    theme?: 'default' | 'glass';
}

const INSPIRING_MESSAGES = [
    "Every mistake is a chance to grow. Take a breath and try again.",
    "The path to focus is a journey, not a sprint. Ready for another round?",
    "Perfection isn't the goal; progress is. Your mind is already sharper!",
    "Breathe. Every master was once a beginner. Let's start fresh.",
    "A minor setback for a major comeback. Keep blooming!",
    "Success is the sum of small efforts. You're getting there.",
];

export const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, onReset, theme = 'default' }) => {
    const isGlass = theme === 'glass';
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isOpen) {
            const randomMessage = INSPIRING_MESSAGES[Math.floor(Math.random() * INSPIRING_MESSAGES.length)];
            setMessage(randomMessage);
        }
    }, [isOpen]);

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
                            isGlass ? "from-red-400 via-orange-500 to-rose-600" : "from-red-400 via-orange-300 to-rose-300"
                        )} />

                        <div className="mb-6 flex justify-center">
                            <div className={clsx(
                                "p-4 rounded-full",
                                isGlass ? "bg-red-500/20" : "bg-red-100"
                            )}>
                                <XCircle size={48} className={isGlass ? "text-red-400" : "text-red-600"} />
                            </div>
                        </div>

                        <h2 className={clsx("text-3xl font-bold mb-2", isGlass ? "text-white" : "text-gray-800")}>Take a Breath</h2>
                        <p className={clsx("mb-8 text-lg font-medium leading-relaxed", isGlass ? "text-gray-300" : "text-gray-600")}>
                            "{message}"
                        </p>

                        <button
                            onClick={onReset}
                            className={clsx(
                                "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg",
                                isGlass ? "bg-red-600 text-white hover:glass-glow" : "bg-gray-900 text-white hover:bg-black"
                            )}
                        >
                            <RefreshCw size={18} /> Restart New Game
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
