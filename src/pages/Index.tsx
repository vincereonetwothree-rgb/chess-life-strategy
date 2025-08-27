import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { LandingHero } from "@/components/LandingHero";
import { ChessBoard } from "@/components/ChessBoard";
import { SessionComplete } from "@/components/SessionComplete";

type AppState = 'landing' | 'game' | 'complete';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');

  const renderCurrentState = () => {
    switch (currentState) {
      case 'landing':
        return <LandingHero />;
      case 'game':
        return <ChessBoard />;
      case 'complete':
        return <SessionComplete />;
      default:
        return <LandingHero />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {renderCurrentState()}
      
      {/* Debug Controls - Remove in production */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50">
        <button 
          onClick={() => setCurrentState('landing')}
          className="px-3 py-2 bg-primary/20 text-primary text-xs rounded border border-primary/30 hover:bg-primary/30"
        >
          Landing
        </button>
        <button 
          onClick={() => setCurrentState('game')}
          className="px-3 py-2 bg-primary/20 text-primary text-xs rounded border border-primary/30 hover:bg-primary/30"
        >
          Game
        </button>
        <button 
          onClick={() => setCurrentState('complete')}
          className="px-3 py-2 bg-primary/20 text-primary text-xs rounded border border-primary/30 hover:bg-primary/30"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default Index;
