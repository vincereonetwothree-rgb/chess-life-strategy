
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

interface GameState {
  board: ChessSquare[][];
  currentTurn: 'white' | 'black';
  castlingRights: {
    whiteKingSide: boolean;
    whiteQueenSide: boolean;
    blackKingSide: boolean;
    blackQueenSide: boolean;
  };
  enPassantTarget: [number, number] | null;
  kingPositions: {
    white: [number, number];
    black: [number, number];
  };
  moveHistory: Array<{
    from: [number, number];
    to: [number, number];
    piece: ChessPiece;
    capturedPiece?: ChessPiece;
    specialMove?: 'castle' | 'enPassant';
  }>;
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
  Array(8).fill(0).map(() => ({ piece: { type: 'pawn', color: 'white', symbol: '♙' } })),
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
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoard,
    currentTurn: 'white',
    castlingRights: {
      whiteKingSide: true,
      whiteQueenSide: true,
      blackKingSide: true,
      blackQueenSide: true
    },
    enPassantTarget: null,
    kingPositions: {
      white: [7, 4],
      black: [0, 4]
    },
    moveHistory: []
  });
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);
  const [currentMove, setCurrentMove] = useState<MoveCard | null>(null);

  // Helper function to check if a square is under attack by the opposing color
  const isSquareUnderAttack = (targetRow: number, targetCol: number, attackingColor: 'white' | 'black', board: ChessSquare[][]) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col].piece;
        if (!piece || piece.color !== attackingColor) continue;
        
        const attackingMoves = getPseudoLegalMoves(row, col, piece, board);
        if (attackingMoves.some(([r, c]) => r === targetRow && c === targetCol)) {
          return true;
        }
      }
    }
    return false;
  };

  // Get pseudo-legal moves (without considering check)
  const getPseudoLegalMoves = (row: number, col: number, piece: ChessPiece, board: ChessSquare[][]): [number, number][] => {
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
        if (col > 0 && row + direction >= 0 && row + direction < 8) {
          const targetPiece = board[row + direction][col - 1].piece;
          if (targetPiece && targetPiece.color !== piece.color) {
            moves.push([row + direction, col - 1]);
          }
        }
        if (col < 7 && row + direction >= 0 && row + direction < 8) {
          const targetPiece = board[row + direction][col + 1].piece;
          if (targetPiece && targetPiece.color !== piece.color) {
            moves.push([row + direction, col + 1]);
          }
        }
        
        // En passant
        if (gameState.enPassantTarget) {
          const [enPassantRow, enPassantCol] = gameState.enPassantTarget;
          if (row + direction === enPassantRow && Math.abs(col - enPassantCol) === 1) {
            moves.push([enPassantRow, enPassantCol]);
          }
        }
        break;
        
      case 'rook':
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
        
        // Castling
        if (piece.color === 'white' && row === 7 && col === 4) {
          // White king-side castling
          if (gameState.castlingRights.whiteKingSide && 
              !board[7][5].piece && !board[7][6].piece &&
              !isSquareUnderAttack(7, 4, 'black', board) &&
              !isSquareUnderAttack(7, 5, 'black', board) &&
              !isSquareUnderAttack(7, 6, 'black', board)) {
            moves.push([7, 6]);
          }
          // White queen-side castling
          if (gameState.castlingRights.whiteQueenSide && 
              !board[7][3].piece && !board[7][2].piece && !board[7][1].piece &&
              !isSquareUnderAttack(7, 4, 'black', board) &&
              !isSquareUnderAttack(7, 3, 'black', board) &&
              !isSquareUnderAttack(7, 2, 'black', board)) {
            moves.push([7, 2]);
          }
        } else if (piece.color === 'black' && row === 0 && col === 4) {
          // Black king-side castling
          if (gameState.castlingRights.blackKingSide && 
              !board[0][5].piece && !board[0][6].piece &&
              !isSquareUnderAttack(0, 4, 'white', board) &&
              !isSquareUnderAttack(0, 5, 'white', board) &&
              !isSquareUnderAttack(0, 6, 'white', board)) {
            moves.push([0, 6]);
          }
          // Black queen-side castling
          if (gameState.castlingRights.blackQueenSide && 
              !board[0][3].piece && !board[0][2].piece && !board[0][1].piece &&
              !isSquareUnderAttack(0, 4, 'white', board) &&
              !isSquareUnderAttack(0, 3, 'white', board) &&
              !isSquareUnderAttack(0, 2, 'white', board)) {
            moves.push([0, 2]);
          }
        }
        break;
    }
    
    return moves;
  };

  // Get legal moves (pseudo-legal moves that don't leave king in check)
  const getValidMoves = (row: number, col: number, piece: ChessPiece): [number, number][] => {
    const pseudoMoves = getPseudoLegalMoves(row, col, piece, gameState.board);
    const legalMoves: [number, number][] = [];

    for (const [toRow, toCol] of pseudoMoves) {
      // Simulate the move
      const newBoard = gameState.board.map(row => row.map(square => ({ ...square })));
      const capturedPiece = newBoard[toRow][toCol].piece;
      newBoard[toRow][toCol] = { piece };
      newBoard[row][col] = {};

      // Check if this move leaves the king in check
      const kingPos = piece.type === 'king' ? [toRow, toCol] : gameState.kingPositions[piece.color];
      const [kingRow, kingCol] = kingPos as [number, number];
      
      if (!isSquareUnderAttack(kingRow, kingCol, piece.color === 'white' ? 'black' : 'white', newBoard)) {
        legalMoves.push([toRow, toCol]);
      }
    }

    return legalMoves;
  };

  const handleSquareClick = (row: number, col: number) => {
    const clickedSquare = gameState.board[row][col];
    
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = gameState.board[selectedRow][selectedCol].piece;
      
      // Check if this is a valid move
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
      
      if (isValidMove && selectedPiece) {
        // Make the move
        const newBoard = gameState.board.map(row => row.map(square => ({ ...square, isSelected: false, isValidMove: false })));
        const capturedPiece = newBoard[row][col].piece;
        
        // Handle special moves
        let specialMove: 'castle' | 'enPassant' | undefined;
        let newEnPassantTarget: [number, number] | null = null;
        let newCastlingRights = { ...gameState.castlingRights };
        let newKingPositions = { ...gameState.kingPositions };
        
        // Check for castling
        if (selectedPiece.type === 'king' && Math.abs(selectedCol - col) === 2) {
          specialMove = 'castle';
          const rookCol = col > selectedCol ? 7 : 0;
          const newRookCol = col > selectedCol ? 5 : 3;
          const rook = newBoard[row][rookCol].piece;
          newBoard[row][newRookCol] = { piece: rook };
          newBoard[row][rookCol] = {};
        }
        
        // Check for en passant
        if (selectedPiece.type === 'pawn' && gameState.enPassantTarget && 
            row === gameState.enPassantTarget[0] && col === gameState.enPassantTarget[1]) {
          specialMove = 'enPassant';
          const captureRow = selectedPiece.color === 'white' ? row + 1 : row - 1;
          newBoard[captureRow][col] = {};
        }
        
        // Check for pawn double move to set en passant target
        if (selectedPiece.type === 'pawn' && Math.abs(selectedRow - row) === 2) {
          newEnPassantTarget = [selectedRow + (row - selectedRow) / 2, col];
        }
        
        // Update castling rights
        if (selectedPiece.type === 'king') {
          if (selectedPiece.color === 'white') {
            newCastlingRights.whiteKingSide = false;
            newCastlingRights.whiteQueenSide = false;
            newKingPositions.white = [row, col];
          } else {
            newCastlingRights.blackKingSide = false;
            newCastlingRights.blackQueenSide = false;
            newKingPositions.black = [row, col];
          }
        }
        
        // Update castling rights if rook moves
        if (selectedPiece.type === 'rook') {
          if (selectedPiece.color === 'white') {
            if (selectedRow === 7 && selectedCol === 0) newCastlingRights.whiteQueenSide = false;
            if (selectedRow === 7 && selectedCol === 7) newCastlingRights.whiteKingSide = false;
          } else {
            if (selectedRow === 0 && selectedCol === 0) newCastlingRights.blackQueenSide = false;
            if (selectedRow === 0 && selectedCol === 7) newCastlingRights.blackKingSide = false;
          }
        }
        
        newBoard[row][col] = { piece: selectedPiece };
        newBoard[selectedRow][selectedCol] = {};
        
        setGameState({
          ...gameState,
          board: newBoard,
          currentTurn: gameState.currentTurn === 'white' ? 'black' : 'white',
          castlingRights: newCastlingRights,
          enPassantTarget: newEnPassantTarget,
          kingPositions: newKingPositions,
          moveHistory: [...gameState.moveHistory, {
            from: [selectedRow, selectedCol],
            to: [row, col],
            piece: selectedPiece,
            capturedPiece,
            specialMove
          }]
        });
        
        setCurrentMove(moveCards[selectedPiece.type]);
      }
      
      setSelectedSquare(null);
      setValidMoves([]);
    } else if (clickedSquare.piece && clickedSquare.piece.color === gameState.currentTurn) {
      // Select piece and show valid moves
      setSelectedSquare([row, col]);
      const moves = getValidMoves(row, col, clickedSquare.piece);
      setValidMoves(moves);
      
      // Update board to show selection and valid moves
      const newBoard = gameState.board.map((boardRow, r) => 
        boardRow.map((square, c) => ({
          ...square,
          isSelected: r === row && c === col,
          isValidMove: moves.some(([mr, mc]) => mr === r && mc === c)
        }))
      );
      setGameState({ ...gameState, board: newBoard });
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
              Current Turn: <span className={`font-semibold ${gameState.currentTurn === 'white' ? 'text-primary' : 'text-warning'}`}>
                {gameState.currentTurn === 'white' ? 'White (You)' : 'Black (AI)'}
              </span>
            </p>
          </div>

          <div className="flex justify-center items-center p-8">
            <div className="relative">
              {/* Board Container with Elegant Shadow */}
              <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-2xl shadow-2xl border border-amber-200/50">
                {/* Coordinate Labels */}
                <div className="absolute -left-6 top-4 bottom-4 flex flex-col justify-around text-sm font-semibold text-amber-800">
                  {['8', '7', '6', '5', '4', '3', '2', '1'].map(rank => (
                    <div key={rank} className="flex items-center justify-center w-4 h-14">{rank}</div>
                  ))}
                </div>
                <div className="absolute -bottom-6 left-4 right-4 flex justify-around text-sm font-semibold text-amber-800">
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
                    <div key={file} className="flex items-center justify-center w-14 h-4">{file}</div>
                  ))}
                </div>
                
                {/* Chess Board */}
                <div className="grid grid-cols-8 gap-0 rounded-lg overflow-hidden shadow-inner border-2 border-amber-300/30">
                  {gameState.board.map((row, rowIndex) =>
                    row.map((square, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                        className={`
                          relative w-16 h-16 flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 ease-out
                          ${
                            isLightSquare(rowIndex, colIndex) 
                              ? 'bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200' 
                              : 'bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700'
                          }
                          ${square.isSelected ? 'ring-4 ring-blue-400/70 ring-inset shadow-lg bg-gradient-to-br from-blue-200 to-blue-300' : ''}
                          ${square.isValidMove ? 'ring-2 ring-green-400/60 ring-inset' : ''}
                          hover:scale-105 hover:shadow-lg hover:z-10 relative
                          border border-amber-200/30
                        `}
                        style={{
                          transform: square.isSelected ? 'scale(1.05)' : 'scale(1)',
                          boxShadow: square.isSelected ? '0 8px 25px rgba(59, 130, 246, 0.3)' : undefined
                        }}
                      >
                        {square.piece && (
                          <span className={`
                            select-none transition-all duration-300 hover:scale-110 relative z-10
                            ${square.piece.color === 'white' 
                              ? 'text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] hover:drop-shadow-[3px_3px_6px_rgba(0,0,0,0.9)]' 
                              : 'text-gray-900 drop-shadow-[2px_2px_4px_rgba(255,255,255,0.8)] hover:drop-shadow-[3px_3px_6px_rgba(255,255,255,0.9)]'
                            }
                            hover:brightness-110 filter
                          `}
                          style={{
                            textShadow: square.piece.color === 'white' 
                              ? '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'
                              : '1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff'
                          }}
                        >
                          {square.piece.symbol}
                        </span>
                        )}
                        {/* Move Indicators */}
                        {square.isValidMove && !square.piece && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 bg-green-500/70 rounded-full border-2 border-green-400 shadow-lg animate-pulse"></div>
                          </div>
                        )}
                        {square.isValidMove && square.piece && (
                          <div className="absolute inset-0 rounded border-4 border-red-500/80 shadow-lg animate-pulse"></div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Move Decision Card */}
      <div className="lg:w-80">
        <Card className="p-6 strategy-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Strategic Analysis
          </h3>
          
          {currentMove ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">{currentMove.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{currentMove.description}</p>
                
                <div className="flex gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded ${getRiskColor(currentMove.riskLevel)} bg-current/10`}>
                    {currentMove.riskLevel.charAt(0).toUpperCase() + currentMove.riskLevel.slice(1)} Risk
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${getRiskColor(currentMove.reward)} bg-current/10`}>
                    {currentMove.reward.charAt(0).toUpperCase() + currentMove.reward.slice(1)} Reward
                  </span>
                </div>
                
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <span className="text-xs font-medium text-primary">Business Concept:</span>
                  <p className="text-sm mt-1">{currentMove.businessConcept}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-primary/30 hover:border-primary text-primary"
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
                <h4 className="font-medium text-sm">Quick Tips:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Click your piece to see possible moves</li>
                  <li>• Each piece teaches different life strategies</li>
                  <li>• Green dots = safe moves</li>
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
