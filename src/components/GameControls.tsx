import React from 'react';
import { RefreshCw } from 'lucide-react';
import type { Difficulty } from '../hooks/useSudoku';
import clsx from 'clsx';

interface GameControlsProps {
    difficulty: Difficulty;
    setDifficulty: (diff: Difficulty) => void;
    onNewGame: () => void;
    mistakes: number;
    theme?: 'default' | 'glass';
}

export const GameControls: React.FC<GameControlsProps> = ({
    difficulty,
    setDifficulty,
    onNewGame,
    mistakes,
    theme = 'default'
}) => {
    const isGlass = theme === 'glass';

    return (
        <div className="w-full flex flex-col gap-6 mb-10">
            <div className="flex justify-between items-center bg-transparent backdrop-blur-sm p-2 rounded-2xl">
                <div className={clsx(
                    "flex gap-1 p-1 rounded-xl transition-colors duration-500",
                    isGlass ? "bg-glass-card border border-glass-border" : "bg-gray-100"
                )}>
                    {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((level) => (
                        <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={clsx(
                                'px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300',
                                difficulty === level
                                    ? isGlass
                                        ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                        : 'bg-white text-pastel-text shadow-md'
                                    : isGlass
                                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                        : 'text-gray-400 hover:text-gray-600'
                            )}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <div className={clsx(
                    "text-sm font-black tracking-widest uppercase px-4 py-2 rounded-lg transition-all",
                    isGlass
                        ? mistakes > 0 ? "text-red-400 bg-red-400/10 border border-red-400/20" : "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                        : mistakes > 0 ? "text-red-500" : "text-gray-400"
                )}>
                    Mistakes: {mistakes}/3
                </div>
            </div>

            <button
                onClick={onNewGame}
                className={clsx(
                    "w-full py-4 font-black text-xl rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3",
                    isGlass
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:glass-glow hover:scale-[1.02]"
                        : "bg-pastel-green text-gray-700 hover:shadow-xl hover:bg-[#a6dec9]"
                )}
            >
                <RefreshCw size={24} className={isGlass ? "animate-spin-slow" : ""} /> New Game
            </button>
        </div>
    );
};
