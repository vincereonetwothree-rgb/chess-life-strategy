import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Users, Target, Brain, Award, TrendingUp } from "lucide-react";

export function LandingHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <span className="text-strategic text-glow">Chess Nexus</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Unleash Your Inner Strategist with AI-Powered Business Simulations.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Navigate complex market scenarios, make critical decisions, and master the art of
              business through dynamic, chess-inspired gameplay. Business Checkmate empowers you
              to refine your strategic thinking, one move at a time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="btn-strategic text-lg px-8 py-4 glow-primary"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 hover:border-primary text-primary px-8 py-4"
            >
              Skip for now / Login
            </Button>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="strategy-card text-center">
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Strategic Thinking</h3>
                <p className="text-sm text-muted-foreground">
                  Master business decision-making through strategic gameplay and AI mentoring.
                </p>
              </div>
            </Card>

            <Card className="strategy-card text-center">
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning/80 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-warning-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-World Application</h3>
                <p className="text-sm text-muted-foreground">
                  Every chess move translates to actionable business insights and financial literacy.
                </p>
              </div>
            </Card>

            <Card className="strategy-card text-center">
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-success/80 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-success-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Personalized Growth</h3>
                <p className="text-sm text-muted-foreground">
                  AI opponent adapts to your goals, creating customized challenges for your development.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mr-2">
                  <Award className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">Business Checkmate</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Master business decision-making through strategic gameplay. Learn strategy, operations,
                marketing, and finance via chess-inspired mechanics.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Users className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Target className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Brain className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">LEARNING</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Curriculum Topics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Session Config</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Getting Started</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">GAME</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Start New Session</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">View Statistics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Game Settings</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">SUPPORT</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">My Profile</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help & Feedback</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Account Access</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}