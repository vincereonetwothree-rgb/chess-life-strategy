import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, Clock, Target } from "lucide-react";

interface ChessPiece {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
  symbol: string;
}

interface ChessSquare {
  piece?: ChessPiece;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

const initialBoard: ChessSquare[][] = [
  // Initial chess position
  [
    { piece: { type: 'rook', color: 'black', symbol: '♜' } },
    { piece: { type: 'knight', color: 'black', symbol: '♞' } },
    { piece: { type: 'bishop', color: 'black', symbol: '♝' } },
    { piece: { type: 'queen', color: 'black', symbol: '♛' } },
    { piece: { type: 'king', color: 'black', symbol: '♚' } },
    { piece: { type: 'bishop', color: 'black', symbol: '♝' } },
    { piece: { type: 'knight', color: 'black', symbol: '♞' } },
    { piece: { type: 'rook', color: 'black', symbol: '♜' } }
  ],
  // Pawns row
  Array(8).fill(0).map(() => ({ piece: { type: 'pawn', color: 'black', symbol: '♟' } })),
  // Empty rows
  ...Array(4).fill(0).map(() => Array(8).fill({})),
  // White pawns
  Array(8).fill(0).map(() => ({ piece: { type: 'pawn', color: 'white', symbol: '♙' } })),
  // White pieces
  [
    { piece: { type: 'rook', color: 'white', symbol: '♖' } },
    { piece: { type: 'knight', color: 'white', symbol: '♘' } },
    { piece: { type: 'bishop', color: 'white', symbol: '♗' } },
    { piece: { type: 'queen', color: 'white', symbol: '♕' } },
    { piece: { type: 'king', color: 'white', symbol: '♔' } },
    { piece: { type: 'bishop', color: 'white', symbol: '♗' } },
    { piece: { type: 'knight', color: 'white', symbol: '♘' } },
    { piece: { type: 'rook', color: 'white', symbol: '♖' } }
  ]
];

export function ChessBoard() {
  const [board, setBoard] = useState<ChessSquare[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [showDecisionOverlay, setShowDecisionOverlay] = useState(false);

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      // Move piece logic would go here
      setSelectedSquare(null);
      setShowDecisionOverlay(true);
    } else if (board[row][col].piece) {
      setSelectedSquare([row, col]);
    }
  };

  const isSquareSelected = (row: number, col: number) => {
    return selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  };

  const isLightSquare = (row: number, col: number) => {
    return (row + col) % 2 === 0;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6">
      {/* Game Stats Sidebar */}
      <Card className="lg:w-64 p-6 strategy-card">
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm text-muted-foreground">Turn Counter</span>
            </div>
            <div className="text-3xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground">of 12 turns</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Session Progress</span>
              <span className="text-sm text-primary">42%</span>
            </div>
            <div className="progress-strategic w-full">
              <div className="h-full w-[42%] rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-semibold text-success">6</div>
              <div className="text-xs text-muted-foreground">Good Moves</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-warning">2</div>
              <div className="text-xs text-muted-foreground">Poor Moves</div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-primary/30 hover:border-primary text-primary"
            onClick={() => setShowDecisionOverlay(true)}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Get Hint
          </Button>
        </div>
      </Card>

      {/* Chess Board */}
      <div className="flex-1">
        <Card className="p-6 strategy-card">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Strategic Decision Point</h2>
            <p className="text-muted-foreground text-sm">
              Your company faces a critical market expansion opportunity. The board expects decisive leadership.
            </p>
          </div>

          <div className="grid grid-cols-8 gap-1 bg-muted/20 p-4 rounded-lg max-w-md mx-auto">
            {board.map((row, rowIndex) =>
              row.map((square, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className={`
                    chess-square w-12 h-12 flex items-center justify-center text-2xl cursor-pointer relative
                    ${isLightSquare(rowIndex, colIndex) ? 'bg-chess-light' : 'bg-chess-dark'}
                    ${isSquareSelected(rowIndex, colIndex) ? 'bg-chess-selected' : ''}
                    hover:brightness-110
                  `}
                >
                  {square.piece && (
                    <span className="chess-piece select-none">
                      {square.piece.symbol}
                    </span>
                  )}
                  {isSquareSelected(rowIndex, colIndex) && (
                    <div className="absolute inset-0 border-2 border-chess-highlight rounded"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Strategic Options Panel */}
      <Card className="lg:w-80 p-6 strategy-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Strategic Options
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
              <span className="font-medium">Aggressive Expansion</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Launch into three new markets simultaneously with full marketing support.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-destructive/20 text-destructive text-xs rounded">High Risk</span>
              <span className="px-2 py-1 bg-success/20 text-success text-xs rounded">High Reward</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-warning/20 bg-warning/5 hover:bg-warning/10 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
              <span className="font-medium">Conservative Growth</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Focus on one market with thorough research and gradual rollout.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-success/20 text-success text-xs rounded">Low Risk</span>
              <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded">Moderate Reward</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
              <span className="font-medium">Strategic Partnership</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Form alliances with local companies to share risks and resources.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">Medium Risk</span>
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Strategic Value</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
              <span className="font-medium">Hold Position</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Delay expansion to strengthen current market position first.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-success/20 text-success text-xs rounded">No Risk</span>
              <span className="px-2 py-1 bg-destructive/20 text-destructive text-xs rounded">Missed Opportunity</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}