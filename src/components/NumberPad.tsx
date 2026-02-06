import React from 'react';
import { motion } from 'framer-motion';
import { Eraser, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

interface NumberPadProps {
    onNumberInput: (num: number) => void;
    onErase: () => void;
    onUndo: () => void;
    theme?: 'default' | 'glass';
}

export const NumberPad: React.FC<NumberPadProps> = ({
    onNumberInput,
    onErase,
    onUndo,
    theme = 'default'
}) => {
    const isGlass = theme === 'glass';
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="flex flex-col gap-6 mt-10 w-full max-w-xl">
            <div className="grid grid-cols-5 gap-3 sm:gap-6">
                {numbers.map((num) => (
                    <motion.button
                        key={num}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNumberInput(num)}
                        className={clsx(
                            "aspect-square rounded-2xl shadow-lg text-3xl font-black transition-all duration-300 flex items-center justify-center",
                            isGlass
                                ? "bg-glass-card border border-glass-border text-white hover:glass-glow hover:border-glass-border-bright"
                                : "bg-pastel-orange text-gray-700 hover:shadow-xl"
                        )}
                    >
                        {num}
                    </motion.button>
                ))}
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onUndo}
                    className={clsx(
                        "aspect-square rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300",
                        isGlass
                            ? "bg-glass-card border border-glass-border text-cyan-400 hover:glass-glow hover:border-glass-border-bright"
                            : "bg-pastel-grey text-gray-600 hover:text-gray-800 hover:shadow-xl"
                    )}
                    aria-label="Undo"
                >
                    <RotateCcw size={32} />
                </motion.button>
            </div>

            <div className="flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onErase}
                    className={clsx(
                        "px-10 py-4 rounded-full flex items-center gap-3 font-bold text-lg transition-all duration-300 shadow-lg",
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
