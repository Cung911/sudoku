import React from 'react';
import { motion } from 'framer-motion';
import { Eraser, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

interface NumberPadProps {
    onErase: () => void;
    onUndo: () => void;
    theme?: 'default' | 'glass';
}

export const NumberPad: React.FC<NumberPadProps> = ({
    onErase,
    onUndo,
    theme = 'default'
}) => {
    const isGlass = theme === 'glass';

    return (
        <div className="flex flex-col gap-6 mt-6 w-full max-w-xl">
            <div className="flex justify-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onUndo}
                    className={clsx(
                        "h-16 px-8 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all duration-300",
                        isGlass
                            ? "bg-glass-card border border-glass-border text-cyan-400 hover:glass-glow hover:border-glass-border-bright"
                            : "bg-pastel-grey text-gray-600 hover:text-gray-800 hover:shadow-xl"
                    )}
                    aria-label="Undo"
                >
                    <RotateCcw size={24} /> <span className="font-bold">Undo</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onErase}
                    className={clsx(
                        "h-16 px-10 rounded-2xl flex items-center gap-3 font-bold transition-all duration-300 shadow-lg",
                        isGlass
                            ? "bg-glass-card border border-glass-border text-gray-300 hover:glass-glow hover:text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    )}
                >
                    <Eraser size={24} /> Erase
                </motion.button>
            </div>
        </div>
    );
};
