
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, Target } from "lucide-react";

interface ChessPiece {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
  symbol: string;
}

interface ChessSquare {
  piece?: ChessPiece;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isValidMove?: boolean;
}

interface MoveCard {
  title: string;
  description: string;
  businessConcept: string;
  riskLevel: 'low' | 'medium' | 'high';
  reward: 'low' | 'medium' | 'high';
}

const initialBoard: ChessSquare[][] = [
  // Black pieces
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
  Array(8).fill(0).map(() => ({ piece: { type: 'pawn', color: 'black', symbol: '♟' } })),
  ...Array(4).fill(0).map(() => Array(8).fill({})),
  Array(8).fill(0).map(() => ({ piece: { type: 'pawn', color: 'white', symbol: '♟︎' } })),
  [
    { piece: { type: 'rook', color: 'white', symbol: '♜' } },
    { piece: { type: 'knight', color: 'white', symbol: '♞' } },
    { piece: { type: 'bishop', color: 'white', symbol: '♝' } },
    { piece: { type: 'queen', color: 'white', symbol: '♛' } },
    { piece: { type: 'king', color: 'white', symbol: '♚' } },
    { piece: { type: 'bishop', color: 'white', symbol: '♝' } },
    { piece: { type: 'knight', color: 'white', symbol: '♞' } },
    { piece: { type: 'rook', color: 'white', symbol: '♜' } }
  ]
];

const moveCards: Record<string, MoveCard> = {
  pawn: {
    title: "Foundation Building",
    description: "Small, consistent steps forward. Like saving $50 monthly - modest but builds discipline.",
    businessConcept: "Incremental Progress",
    riskLevel: "low",
    reward: "low"
  },
  knight: {
    title: "Creative Problem Solving", 
    description: "Think outside the box. Sometimes unconventional approaches yield the best results.",
    businessConcept: "Innovation Strategy",
    riskLevel: "medium",
    reward: "high"
  },
  bishop: {
    title: "Long-term Vision",
    description: "Focus on diagonal growth - specialization in your chosen field over time.",
    businessConcept: "Strategic Focus",
    riskLevel: "low",
    reward: "medium"
  },
  rook: {
    title: "Direct Action",
    description: "Straight-line power moves. Bold decisions that cut through complexity.",
    businessConcept: "Decisive Leadership",
    riskLevel: "medium",
    reward: "high"
  },
  queen: {
    title: "Maximum Leverage",
    description: "Your most valuable asset. Use it wisely - represents your peak skill or network.",
    businessConcept: "Core Competency",
    riskLevel: "high",
    reward: "high"
  },
  king: {
    title: "Personal Security",
    description: "Protect your foundation - emergency fund, health, core relationships.",
    businessConcept: "Risk Management",
    riskLevel: "low",
    reward: "medium"
  }
};

export function ChessBoard() {
  const [board, setBoard] = useState<ChessSquare[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);
  const [currentMove, setCurrentMove] = useState<MoveCard | null>(null);
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');

  const getValidMoves = (row: number, col: number, piece: ChessPiece): [number, number][] => {
    const moves: [number, number][] = [];
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Forward move
        if (row + direction >= 0 && row + direction < 8 && !board[row + direction][col].piece) {
          moves.push([row + direction, col]);
          
          // Double move from start
          if (row === startRow && !board[row + 2 * direction][col].piece) {
            moves.push([row + 2 * direction, col]);
          }
        }
        
        // Captures
        if (col > 0 && board[row + direction] && board[row + direction][col - 1].piece?.color !== piece.color) {
          moves.push([row + direction, col - 1]);
        }
        if (col < 7 && board[row + direction] && board[row + direction][col + 1].piece?.color !== piece.color) {
          moves.push([row + direction, col + 1]);
        }
        break;
        
      case 'rook':
        // Horizontal and vertical moves
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [dr, dc] of directions) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece) {
              moves.push([newRow, newCol]);
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;
        
      case 'knight':
        const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
        for (const [dr, dc] of knightMoves) {
          const newRow = row + dr;
          const newCol = col + dc;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece || targetPiece.color !== piece.color) {
              moves.push([newRow, newCol]);
            }
          }
        }
        break;
        
      case 'bishop':
        const diagonals = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        for (const [dr, dc] of diagonals) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece) {
              moves.push([newRow, newCol]);
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;
        
      case 'queen':
        // Combination of rook and bishop moves
        const queenDirections = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
        for (const [dr, dc] of queenDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece) {
              moves.push([newRow, newCol]);
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;
        
      case 'king':
        const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        for (const [dr, dc] of kingMoves) {
          const newRow = row + dr;
          const newCol = col + dc;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece || targetPiece.color !== piece.color) {
              moves.push([newRow, newCol]);
            }
          }
        }
        break;
    }
    
    return moves;
  };

  const handleSquareClick = (row: number, col: number) => {
    const clickedSquare = board[row][col];
    
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = board[selectedRow][selectedCol].piece;
      
      // Check if this is a valid move
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
      
      if (isValidMove && selectedPiece) {
        // Make the move
        const newBoard = board.map(row => row.map(square => ({ ...square, isSelected: false, isValidMove: false })));
        newBoard[row][col] = { piece: selectedPiece, isSelected: false, isValidMove: false };
        newBoard[selectedRow][selectedCol] = { isSelected: false, isValidMove: false };
        
        setBoard(newBoard);
        setCurrentMove(moveCards[selectedPiece.type]);
        setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
      }
      
      setSelectedSquare(null);
      setValidMoves([]);
    } else if (clickedSquare.piece && clickedSquare.piece.color === currentTurn) {
      // Select piece and show valid moves
      setSelectedSquare([row, col]);
      const moves = getValidMoves(row, col, clickedSquare.piece);
      setValidMoves(moves);
      
      // Update board to show selection and valid moves
      const newBoard = board.map((boardRow, r) => 
        boardRow.map((square, c) => ({
          ...square,
          isSelected: r === row && c === col,
          isValidMove: moves.some(([mr, mc]) => mr === r && mc === c)
        }))
      );
      setBoard(newBoard);
    }
  };

  const isLightSquare = (row: number, col: number) => {
    return (row + col) % 2 === 0;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto p-4">
      {/* Chess Board */}
      <div className="flex-1">
        <Card className="p-6 strategy-card">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Strategic Decision Point</h2>
            <p className="text-sm text-muted-foreground mb-2">
              Current Turn: <span className={`font-semibold ${currentTurn === 'white' ? 'text-primary' : 'text-warning'}`}>
                {currentTurn === 'white' ? 'White (You)' : 'Black (AI)'}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-8 gap-0 bg-muted/20 p-4 rounded-lg max-w-lg mx-auto border-2 border-primary/20">
            {board.map((row, rowIndex) =>
              row.map((square, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className={`
                    relative w-14 h-14 flex items-center justify-center text-3xl cursor-pointer transition-all duration-200
                    ${isLightSquare(rowIndex, colIndex) ? 'bg-amber-50' : 'bg-amber-800'}
                    ${square.isSelected ? 'bg-blue-300 ring-2 ring-blue-500' : ''}
                    ${square.isValidMove ? 'ring-2 ring-green-500' : ''}
                    hover:brightness-110
                  `}
                >
                   {square.piece && (
                    <span className={`
                      select-none font-bold text-4xl transition-all duration-200 hover:scale-110
                      ${square.piece.color === 'white' 
                        ? 'text-white [text-shadow:0_0_0_#000,_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_2px_2px_0_#000,_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                        : 'text-black filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                      }
                    `}>
                      {square.piece.symbol}
                    </span>
                   )}
                  {square.isValidMove && !square.piece && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    </div>
                  )}
                  {square.isValidMove && square.piece && (
                    <div className="absolute inset-0 border-4 border-red-600 rounded"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Move Decision Card */}
      <div className="lg:w-80">
        <Card className="p-6 bg-background border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
            <Target className="w-5 h-5 mr-2 text-muted-foreground" />
            Strategic Analysis
          </h3>
          
          {currentMove ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{currentMove.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{currentMove.description}</p>
                
                <div className="flex gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded ${getRiskColor(currentMove.riskLevel)} bg-current/10`}>
                    {currentMove.riskLevel.charAt(0).toUpperCase() + currentMove.riskLevel.slice(1)} Risk
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${getRiskColor(currentMove.reward)} bg-current/10`}>
                    {currentMove.reward.charAt(0).toUpperCase() + currentMove.reward.slice(1)} Reward
                  </span>
                </div>
                
                <div className="p-3 bg-muted/20 border border-border rounded-lg">
                  <span className="text-xs font-medium text-foreground">Business Concept:</span>
                  <p className="text-sm mt-1 text-muted-foreground">{currentMove.businessConcept}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setCurrentMove(null)}
              >
                Continue Playing
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-8">
                <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Select a piece and make a move to see the strategic analysis
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-foreground">Quick Tips:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Click your piece to see possible moves</li>
                  <li>• Each piece teaches different life strategies</li>
                  <li>• Small dots = safe moves</li>
                  <li>• Red borders = capture opportunities</li>
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
