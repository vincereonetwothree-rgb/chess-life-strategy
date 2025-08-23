import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Target, Clock, User, Sparkles, ArrowRight } from "lucide-react";

interface OnboardingData {
  primaryGoal: string;
  fiveYearVision: string;
  age: string;
  timeAvailability: string;
}

export function OnboardingFlow({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    primaryGoal: '',
    fiveYearVision: '',
    age: '',
    timeAvailability: ''
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (key: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Your VIP Journey</h2>
              <p className="text-muted-foreground">
                Let's personalize your strategic learning experience
              </p>
            </div>

            <Card className="strategy-card text-left max-w-md mx-auto">
              <div className="p-6">
                <Label htmlFor="vision" className="text-base font-medium mb-4 block">
                  Where do you see yourself in 5 years? *
                </Label>
                <Input
                  id="vision"
                  placeholder="e.g., Leading my own startup, Financial independence, Career advancement..."
                  value={formData.fiveYearVision}
                  onChange={(e) => updateFormData('fiveYearVision', e.target.value)}
                  className="min-h-[60px] text-base"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This helps us create your personalized AI mentor
                </p>
              </div>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-warning to-warning/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-warning-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">What's Your Primary Focus?</h2>
              <p className="text-muted-foreground">
                We'll tailor scenarios to match your goals
              </p>
            </div>

            <Card className="strategy-card text-left max-w-md mx-auto">
              <div className="p-6">
                <RadioGroup 
                  value={formData.primaryGoal} 
                  onValueChange={(value) => updateFormData('primaryGoal', value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/20">
                    <RadioGroupItem value="finance" id="finance" />
                    <Label htmlFor="finance" className="flex-1 cursor-pointer">
                      <div className="font-medium">Financial Mastery</div>
                      <div className="text-sm text-muted-foreground">Investment, budgeting, wealth building</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/20">
                    <RadioGroupItem value="career" id="career" />
                    <Label htmlFor="career" className="flex-1 cursor-pointer">
                      <div className="font-medium">Career Advancement</div>
                      <div className="text-sm text-muted-foreground">Leadership, negotiation, strategic thinking</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/20">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="flex-1 cursor-pointer">
                      <div className="font-medium">Business Strategy</div>
                      <div className="text-sm text-muted-foreground">Entrepreneurship, market analysis, operations</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-success-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">
                Optional - helps us customize difficulty and examples
              </p>
            </div>

            <Card className="strategy-card text-left max-w-md mx-auto">
              <div className="p-6 space-y-4">
                <div>
                  <Label htmlFor="age" className="text-sm font-medium mb-2 block">
                    Age Range (Optional)
                  </Label>
                  <RadioGroup 
                    value={formData.age} 
                    onValueChange={(value) => updateFormData('age', value)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="17-19" id="17-19" />
                      <Label htmlFor="17-19" className="text-sm">17-19</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="20-22" id="20-22" />
                      <Label htmlFor="20-22" className="text-sm">20-22</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="23-25" id="23-25" />
                      <Label htmlFor="23-25" className="text-sm">23-25</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="25+" id="25+" />
                      <Label htmlFor="25+" className="text-sm">25+</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">How Much Time Do You Have?</h2>
              <p className="text-muted-foreground">
                We'll adjust session length and complexity accordingly
              </p>
            </div>

            <Card className="strategy-card text-left max-w-md mx-auto">
              <div className="p-6">
                <RadioGroup 
                  value={formData.timeAvailability} 
                  onValueChange={(value) => updateFormData('timeAvailability', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/20">
                    <RadioGroupItem value="quick" id="quick" />
                    <Label htmlFor="quick" className="flex-1 cursor-pointer">
                      <div className="font-medium">Quick Sessions (5-10 min)</div>
                      <div className="text-sm text-muted-foreground">Perfect for busy schedules</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/20">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="flex-1 cursor-pointer">
                      <div className="font-medium">Standard Sessions (15-20 min)</div>
                      <div className="text-sm text-muted-foreground">Balanced learning experience</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/20">
                    <RadioGroupItem value="deep" id="deep" />
                    <Label htmlFor="deep" className="flex-1 cursor-pointer">
                      <div className="font-medium">Deep Dive (30+ min)</div>
                      <div className="text-sm text-muted-foreground">Comprehensive strategic analysis</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.fiveYearVision.trim() !== '';
      case 2:
        return formData.primaryGoal !== '';
      case 3:
        return true; // Optional step
      case 4:
        return formData.timeAvailability !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
            <span className="text-sm text-primary">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted/20 rounded-full h-2">
            <div 
              className="progress-strategic h-full rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className="text-muted-foreground hover:text-primary"
          >
            Back
          </Button>

          <div className="flex gap-2">
            {step < 4 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(4)}
                className="border-primary/30 hover:border-primary text-primary"
              >
                Skip Optional
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-strategic"
            >
              {step === 4 ? 'Begin Journey' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}