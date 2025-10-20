import { useState } from "react";
import { Star, ThumbsUp, Heart, Smile, Meh, Frown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RatingVariations = () => {
  const [sliderRating, setSliderRating] = useState([7]);
  const [starRating, setStarRating] = useState(7);
  const [buttonRating, setButtonRating] = useState(7);
  const [emojiRating, setEmojiRating] = useState(7);
  const [segmentRating, setSegmentRating] = useState(7);

  const getRatingColor = (value: number) => {
    if (value >= 9) return "text-rating-excellent";
    if (value >= 7) return "text-rating-good";
    if (value >= 5) return "text-rating-okay";
    return "text-rating-poor";
  };

  const getBgColor = (value: number) => {
    if (value >= 9) return "bg-rating-excellent";
    if (value >= 7) return "bg-rating-good";
    if (value >= 5) return "bg-rating-okay";
    return "bg-rating-poor";
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Rating Input Variations</h1>

      {/* Option 1: Current Slider Design */}
      <div className="p-6 border-2 rounded-xl bg-card">
        <h3 className="font-semibold mb-4">1. Slider with Visual Feedback (Current)</h3>
        <div className={`rounded-xl p-4 ${getBgColor(sliderRating[0])} bg-opacity-10 border-2 ${getBgColor(sliderRating[0])} border-opacity-30`}>
          <div className="flex items-baseline justify-between mb-3">
            <span className={`text-4xl font-bold ${getRatingColor(sliderRating[0])}`}>
              {sliderRating[0].toFixed(1)}
            </span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getBgColor(sliderRating[0])} bg-opacity-20`}>
              {sliderRating[0] >= 9 ? "Excellent" : sliderRating[0] >= 7 ? "Good" : sliderRating[0] >= 5 ? "Okay" : "Needs Work"}
            </span>
          </div>
          <Slider
            value={sliderRating}
            onValueChange={setSliderRating}
            min={1}
            max={10}
            step={0.5}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Option 2: Star Rating */}
      <div className="p-6 border-2 rounded-xl bg-card">
        <h3 className="font-semibold mb-4">2. Star Rating (Tap to Rate)</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(starRating)}`}>
            {starRating.toFixed(1)}
          </span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <button
                key={rating}
                onClick={() => setStarRating(rating)}
                className="transition-all hover:scale-110"
              >
                <Star
                  className={cn(
                    "w-8 h-8",
                    rating <= starRating
                      ? `fill-current ${getRatingColor(starRating)}`
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Option 3: Number Buttons */}
      <div className="p-6 border-2 rounded-xl bg-card">
        <h3 className="font-semibold mb-4">3. Number Pills (Quick Tap)</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(buttonRating)}`}>
            {buttonRating.toFixed(1)}
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <Button
                key={rating}
                onClick={() => setButtonRating(rating)}
                variant={rating === buttonRating ? "default" : "outline"}
                className={cn(
                  "w-12 h-12 rounded-full font-bold text-lg",
                  rating === buttonRating && getBgColor(rating)
                )}
              >
                {rating}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Option 4: Emoji Scale */}
      <div className="p-6 border-2 rounded-xl bg-card">
        <h3 className="font-semibold mb-4">4. Emoji Visual Scale</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(emojiRating)}`}>
            {emojiRating.toFixed(1)}
          </span>
          <div className="flex gap-3">
            {[
              { range: [1, 2, 3], icon: Frown, label: "Poor" },
              { range: [4, 5, 6], icon: Meh, label: "Okay" },
              { range: [7, 8], icon: Smile, label: "Good" },
              { range: [9, 10], icon: Heart, label: "Excellent" }
            ].map(({ range, icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">{label}</span>
                <div className="flex gap-1">
                  {range.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setEmojiRating(rating)}
                      className={cn(
                        "p-3 rounded-xl border-2 transition-all hover:scale-110",
                        rating === emojiRating
                          ? `${getBgColor(rating)} border-opacity-50`
                          : "border-muted"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6",
                          rating === emojiRating ? getRatingColor(rating) : "text-muted-foreground"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Option 5: Segmented Range Control */}
      <div className="p-6 border-2 rounded-xl bg-card">
        <h3 className="font-semibold mb-4">5. Grouped Range Selector</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(segmentRating)}`}>
            {segmentRating.toFixed(1)}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
            {[
              { range: [1, 2, 3], label: "Poor", color: "bg-rating-poor" },
              { range: [4, 5, 6], label: "Okay", color: "bg-rating-okay" },
              { range: [7, 8], label: "Good", color: "bg-rating-good" },
              { range: [9, 10], label: "Excellent", color: "bg-rating-excellent" }
            ].map(({ range, label, color }) => (
              <div key={label} className="space-y-2">
                <div className={`${color} bg-opacity-10 rounded-lg p-3 text-center border-2 ${color} border-opacity-30`}>
                  <div className="text-sm font-semibold mb-2">{label}</div>
                  <div className="flex gap-1 justify-center">
                    {range.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSegmentRating(rating)}
                        className={cn(
                          "w-10 h-10 rounded-lg font-bold transition-all",
                          rating === segmentRating
                            ? `${color} text-white shadow-lg scale-110`
                            : "bg-background hover:bg-muted"
                        )}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingVariations;