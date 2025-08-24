import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, HelpCircle, Trophy } from "lucide-react";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-strategic">Chess Nexus</span>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Button variant="ghost" className="text-foreground hover:text-primary">
            New Game
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Progress
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Settings
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Support
          </Button>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            <Trophy className="w-3 h-3 mr-1" />
            Score: 2,450
          </Badge>
          
          <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary">
            <User className="w-4 h-4 mr-2" />
            U
          </Button>
        </div>
      </div>
    </nav>
  );
}