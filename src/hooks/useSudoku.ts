import { useState, useCallback, useEffect } from 'react';
import { generateSudoku } from '../lib/sudoku';
import type { Grid } from '../lib/sudoku';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';


export const useSudoku = () => {
    const [stage, setStage] = useState<'playing' | 'won'>('playing');
    const [board, setBoard] = useState<Grid>([]);
    const [initialBoard, setInitialBoard] = useState<Grid>([]);
    const [solvedBoard, setSolvedBoard] = useState<Grid>([]);
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    const [mistakes, setMistakes] = useState(0);
    const [history, setHistory] = useState<Grid[]>([]);
    const [difficulty, setDifficulty] = useState<Difficulty>('Easy');

    // Initialize game
    const newGame = useCallback((diff: Difficulty = difficulty) => {
        const { initialGrid, solvedGrid } = generateSudoku(diff);
        setBoard(initialGrid); // This is the current state of the board
        setInitialBoard(initialGrid.map(row => [...row])); // Deep copy for resetting references
        setSolvedBoard(solvedGrid);
        setMistakes(0);
        setHistory([]);
        setStage('playing');
        setDifficulty(diff);
        setSelectedCell(null);
    }, [difficulty]);

    // Handle cell selection
    const onCellSelect = (row: number, col: number) => {
        setSelectedCell([row, col]);
    };

    // Handle number input
    const onNumberInput = (num: number) => {
        if (!selectedCell || stage !== 'playing') return;

        const [row, col] = selectedCell;

        // Check if cell is fixed (part of initial board)
        if (initialBoard[row][col] !== null) return;

        // Save history before move
        setHistory(prev => [...prev, board.map(r => [...r])]);

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = num;
        setBoard(newBoard);

        // Check validity
        // We check against the pre-solved board for instant feedback "True/False" style,
        // OR we just use isValidMove for "Game Rules" validity.
        // Making it "Beginner Friendly" usually means instant feedback if it's WRONG according to the Solution.
        if (newBoard[row][col] !== solvedBoard[row][col]) {
            setMistakes(prev => prev + 1);
        }

        // Check consistency/completion
        checkCompletion(newBoard);
    };

    const checkCompletion = (currentBoard: Grid) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentBoard[i][j] === null || currentBoard[i][j] !== solvedBoard[i][j]) {
                    return;
                }
            }
        }
        setStage('won');
    };

    const onUndo = () => {
        if (history.length === 0) return;
        const previousBoard = history[history.length - 1];
        setBoard(previousBoard);
        setHistory(prev => prev.slice(0, -1));
    };

    const onErase = () => {
        if (!selectedCell || stage !== 'playing') return;
        const [row, col] = selectedCell;
        if (initialBoard[row][col] !== null) return;

        setHistory(prev => [...prev, board.map(r => [...r])]);
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = null;
        setBoard(newBoard);
    };

    // Initial load
    useEffect(() => {
        newGame();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        board,
        initialBoard,
        solvedBoard,
        selectedCell,
        mistakes,
        stage,
        difficulty,
        newGame,
        onCellSelect,
        onNumberInput,
        onUndo,
        onErase,
        setDifficulty
    };
};
