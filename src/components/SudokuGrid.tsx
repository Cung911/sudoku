import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Grid } from '../lib/sudoku';

interface SudokuGridProps {
    board: Grid;
    initialBoard: Grid;
    selectedCell: [number, number] | null;
    onCellSelect: (row: number, col: number) => void;
    mistakes: number;
    theme?: 'default' | 'glass';
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({
    board,
    initialBoard,
    selectedCell,
    onCellSelect,
    theme = 'default'
}) => {
    const isGlass = theme === 'glass';

    return (
        <div className={clsx(
            "grid grid-cols-9 gap-1 border-4 rounded-xl overflow-hidden shadow-2xl select-none transition-all duration-500 w-full",
            isGlass
                ? "bg-glass-border glass-morphism border-glass-border-bright"
                : "bg-gray-300 border-gray-400"
        )}>
            {board.map((row, rowIndex) =>
                row.map((cellValue, colIndex) => {
                    const isInitial = initialBoard[rowIndex][colIndex] !== null;
                    const isSelected =
                        selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;

                    const isRelated = selectedCell && (
                        selectedCell[0] === rowIndex ||
                        selectedCell[1] === colIndex ||
                        (Math.floor(selectedCell[0] / 3) === Math.floor(rowIndex / 3) &&
                            Math.floor(selectedCell[1] / 3) === Math.floor(colIndex / 3))
                    );

                    const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex !== 8;
                    const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;

                    return (
                        <motion.div
                            key={`${rowIndex}-${colIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (rowIndex * 9 + colIndex) * 0.002 }}
                            onClick={() => onCellSelect(rowIndex, colIndex)}
                            className={clsx(
                                'w-full aspect-square flex items-center justify-center text-2xl sm:text-4xl cursor-pointer transition-all duration-300 relative group',
                                isRightBorder && (isGlass ? 'border-r border-glass-border-bright' : 'border-r-2 border-gray-400'),
                                isBottomBorder && (isGlass ? 'border-b border-glass-border-bright' : 'border-b-2 border-gray-400'),
                                isSelected
                                    ? isGlass
                                        ? 'bg-glass-glow/30 text-white font-black scale-105 z-10 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                                        : 'bg-pastel-green text-gray-800 font-bold'
                                    : isRelated
                                        ? isGlass ? 'bg-white/5' : 'bg-pastel-grey/50'
                                        : isGlass ? 'bg-transparent hover:bg-white/10' : 'bg-white hover:bg-gray-50',
                                isInitial
                                    ? isGlass ? 'text-white font-bold' : 'text-black font-bold'
                                    : isGlass ? 'text-cyan-400 font-medium' : 'text-blue-600 font-medium'
                            )}
                        >
                            {cellValue}
                            {isSelected && isGlass && (
                                <motion.div
                                    layoutId="glow"
                                    className="absolute inset-0 border-2 border-cyan-400 rounded-sm pointer-events-none"
                                />
                            )}
                        </motion.div>
                    );
                })
            )}
        </div>
    );
};
