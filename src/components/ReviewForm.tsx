import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ReviewForm = () => {
  const [cocktailName, setCocktailName] = useState("");
  const [rating, setRating] = useState([7]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");
  const [venue, setVenue] = useState("");
  const [occasion, setOccasion] = useState("");
  const [modifications, setModifications] = useState("");
  const [showOptional, setShowOptional] = useState(false);

  const getRatingColor = (value: number) => {
    if (value >= 9) return "bg-rating-excellent";
    if (value >= 7) return "bg-rating-good";
    if (value >= 5) return "bg-rating-okay";
    return "bg-rating-poor";
  };

  const getRatingLabel = (value: number) => {
    if (value >= 9) return "Excellent";
    if (value >= 7) return "Good";
    if (value >= 5) return "Okay";
    return "Needs Work";
  };

  const handleSubmit = () => {
    if (!cocktailName.trim()) {
      toast.error("Please enter a cocktail name");
      return;
    }

    // Here you would save to IndexedDB
    toast.success("Review logged successfully!");
    
    // Reset form
    setCocktailName("");
    setRating([7]);
    setDate(new Date().toISOString().split('T')[0]);
    setNotes("");
    setVenue("");
    setOccasion("");
    setModifications("");
    setShowOptional(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4 border-b">
        <h2 className="text-2xl font-bold mb-1">Quick 30-Second Review</h2>
        <p className="text-sm text-muted-foreground">Type name → rate → add notes → save</p>
      </div>

      {/* Main Form - Compact 2-column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Primary Fields */}
        <div className="space-y-5">
          {/* Cocktail Name */}
          <div className="space-y-2">
            <Label htmlFor="cocktail" className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              What are you drinking?
            </Label>
            <Input
              id="cocktail"
              value={cocktailName}
              onChange={(e) => setCocktailName(e.target.value)}
              placeholder="Start typing cocktail name..."
              className="h-12 text-lg font-medium border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>

          {/* Rating Slider */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Rating</Label>
            <div className="flex items-center gap-4">
              <div className={`flex-1 rounded-xl p-4 ${getRatingColor(rating[0])} bg-opacity-10 border-2 ${getRatingColor(rating[0])} border-opacity-30`}>
                <div className="flex items-baseline justify-between mb-3">
                  <span className={`text-4xl font-bold ${getRatingColor(rating[0])} bg-clip-text`}>
                    {rating[0].toFixed(1)}
                  </span>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getRatingColor(rating[0])} bg-opacity-20`}>
                    {getRatingLabel(rating[0])}
                  </span>
                </div>
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  min={1}
                  max={10}
                  step={0.5}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Poor</span>
                  <span>Perfect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-base font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 border-2"
            />
          </div>
        </div>

        {/* Right Column - Notes */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base font-semibold">
              Tasting Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did it taste? Any variations or observations?"
              className="min-h-[200px] border-2 resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              Describe flavors, balance, presentation, or any tweaks made
            </p>
          </div>
        </div>
      </div>

      {/* Optional Fields - Collapsible */}
      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          onClick={() => setShowOptional(!showOptional)}
          className="w-full justify-between hover:bg-muted/50"
        >
          <span className="font-semibold">Optional Details</span>
          <span className="text-sm text-muted-foreground">
            {showOptional ? "Hide" : "Show"} venue, occasion, modifications
          </span>
        </Button>

        {showOptional && (
          <div className="grid md:grid-cols-3 gap-4 mt-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="venue" className="text-sm font-semibold">Venue</Label>
              <Input
                id="venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Bar name or 'home'"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occasion" className="text-sm font-semibold">Occasion</Label>
              <Input
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="Dinner, experiment, etc."
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modifications" className="text-sm font-semibold">Modifications</Label>
              <Input
                id="modifications"
                value={modifications}
                onChange={(e) => setModifications(e.target.value)}
                placeholder="Recipe changes"
                className="h-10"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-lg font-semibold bg-gradient-primary shadow-button hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <Save className="w-5 h-5 mr-2" />
          Log This Cocktail
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
