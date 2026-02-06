import { useSudoku } from './hooks/useSudoku';
import { SudokuGrid } from './components/SudokuGrid';
import { NumberPad } from './components/NumberPad';
import { GameControls } from './components/GameControls';
import { ResultCard } from './components/ResultCard';
import { Leaf, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

function App() {
  const [theme, setTheme] = useState<'default' | 'glass'>('default');
  const {
    board,
    initialBoard,
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
  } = useSudoku();
  const isGlass = theme === 'glass';

  // Keyboard Input Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage !== 'playing') return;

      if (e.key >= '1' && e.key <= '9') {
        onNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        onErase();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        onUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, onNumberInput, onErase, onUndo]);

  return (
    <div className={clsx(
      "min-h-screen flex flex-col items-center py-12 px-4 font-sans transition-colors duration-500",
      isGlass ? "bg-glass-bg text-glass-text" : "bg-pastel-bg text-pastel-text"
    )}>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(prev => prev === 'default' ? 'glass' : 'default')}
        className={clsx(
          "fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-50",
          isGlass ? "bg-glass-card text-yellow-400 border border-glass-border hover:glass-glow" : "bg-white text-indigo-600 hover:shadow-xl"
        )}
      >
        {isGlass ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Header */}
      <header className="mb-12 text-center">
        <div className={clsx(
          "inline-flex items-center gap-2 px-6 py-2 rounded-full shadow-sm mb-6 transition-colors",
          isGlass ? "bg-glass-card border border-glass-border" : "bg-white"
        )}>
          <Leaf size={16} className={isGlass ? "text-cyan-400" : "text-green-500"} />
          <span className={clsx(
            "text-xs font-bold tracking-widest uppercase",
            isGlass ? "text-cyan-400" : "text-gray-500"
          )}>Social Detox Mode</span>
        </div>
        <h1 className={clsx(
          "text-5xl font-black tracking-tighter mb-4 transition-colors",
          isGlass ? "text-white" : "text-gray-800"
        )}>
          Daily <span className={clsx(
            "text-transparent bg-clip-text bg-gradient-to-r",
            isGlass ? "from-cyan-400 via-blue-500 to-purple-600" : "from-green-400 to-orange-300"
          )}>Sudoku</span>
        </h1>
        <p className={clsx(
          "max-w-md mx-auto text-lg",
          isGlass ? "text-gray-400" : "text-gray-500"
        )}>
          Calm your mind and focus on the numbers. No notifications, just you and the grid.
        </p>
      </header>

      {/* Main Game Area */}
      <div className="w-full max-w-xl flex flex-col items-center">
        <GameControls
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onNewGame={() => newGame(difficulty)}
          mistakes={mistakes}
          theme={theme}
        />

        <SudokuGrid
          board={board}
          initialBoard={initialBoard}
          selectedCell={selectedCell}
          onCellSelect={onCellSelect}
          mistakes={mistakes}
          theme={theme}
        />

        <NumberPad
          onErase={onErase}
          onUndo={onUndo}
          theme={theme}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>© 2026 Sudoku Zen. Designed for focus.</p>
      </footer>

      {/* Result Modal */}
      <ResultCard
        isOpen={stage === 'won'}
        onClose={() => newGame(difficulty)}
        difficulty={difficulty}
      />

    </div>
  );
}

export default App;
