import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, X, Trophy, Target, Brain, TrendingUp } from "lucide-react";

export function SessionComplete() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Score Display */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              SESSION COMPLETE
            </span>
          </div>
          <div className="text-6xl md:text-8xl font-bold text-strategic text-glow mb-4">
            8,500
          </div>
          <div className="text-xl text-primary mb-6">Decision Score</div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You navigated the scenario with strategic precision. Review your performance breakdown
            below and discover actionable insights for real-world application.
          </p>
        </div>

        {/* Performance Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="strategy-card text-center">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">12:34</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                TIME TAKEN
              </div>
            </div>
          </Card>

          <Card className="strategy-card text-center">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-destructive" />
              </div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                MISTAKES MADE
              </div>
            </div>
          </Card>

          <Card className="strategy-card text-center">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-success" />
              </div>
              <div className="text-3xl font-bold mb-2">+1,250</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                SCORE EARNED
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Analysis Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Decision Hotspots */}
          <Card className="strategy-card">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Decision Hotspots</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This heatmap visualizes your decision-making patterns. Vibrant spots indicate
                critical moments or areas where you deviated from the optimal path. Hover
                over a point to get detailed feedback.
              </p>
              
              {/* Heatmap Visualization Placeholder */}
              <div className="bg-muted/20 rounded-lg h-48 flex items-center justify-center border border-primary/20">
                <div className="text-center">
                  <Target className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Interactive Decision Heatmap</p>
                  <p className="text-xs text-muted-foreground mt-1">Hover for detailed insights</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Real-Life Micro-Action */}
          <Card className="strategy-card">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Real-Life Micro-Action</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-primary">"The Five Whys" Technique</h4>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                Next time you face a complex problem at work,
                ask "Why?" five times to drill down to the root
                cause. This sharpens your analytical depth,
                mirroring the strategic thinking required in our
                scenarios and improving your problem-solving
                skills in high-pressure business situations.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-sm mb-1">Strategic Insight</h5>
                    <p className="text-xs text-muted-foreground">
                      Your pattern recognition improved 23% this session through systematic analysis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
                  <TrendingUp className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-sm mb-1">Growth Metric</h5>
                    <p className="text-xs text-muted-foreground">
                      Risk assessment skills increased by 15% compared to your last session.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            size="lg" 
            className="btn-strategic px-8 py-3"
          >
            Continue Journey
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary/30 hover:border-primary text-primary px-8 py-3"
          >
            Review Analysis
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-muted-foreground hover:text-primary px-8 py-3"
          >
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}