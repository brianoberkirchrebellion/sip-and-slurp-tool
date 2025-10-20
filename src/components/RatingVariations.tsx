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
        <h3 className="font-semibold mb-4">2. Star Rating (Click left/right side for half stars)</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(starRating)}`}>
            {starRating.toFixed(1)}
          </span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <div key={rating} className="relative">
                <button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const isLeftHalf = x < rect.width / 2;
                    setStarRating(isLeftHalf ? rating - 0.5 : rating);
                  }}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-8 h-8",
                      rating <= starRating
                        ? `fill-current ${getRatingColor(starRating)}`
                        : rating - 0.5 === starRating
                        ? `fill-current ${getRatingColor(starRating)} opacity-50`
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Option 3: Number Buttons */}
      <div className="p-6 border-2 rounded-xl bg-card">
        <h3 className="font-semibold mb-4">3. Number Pills (Includes half points)</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(buttonRating)}`}>
            {buttonRating.toFixed(1)}
          </span>
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
            {Array.from({ length: 19 }, (_, i) => (i + 2) * 0.5).map((rating) => (
              <Button
                key={rating}
                onClick={() => setButtonRating(rating)}
                variant={rating === buttonRating ? "default" : "outline"}
                className={cn(
                  "h-10 px-3 rounded-full font-bold text-sm min-w-[2.5rem]",
                  rating === buttonRating && getBgColor(rating)
                )}
              >
                {rating.toFixed(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Option 4: Emoji Scale */}
      <div className="p-6 border-2 rounded-xl bg-card">
        <h3 className="font-semibold mb-4">4. Emoji Visual Scale (With half points)</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(emojiRating)}`}>
            {emojiRating.toFixed(1)}
          </span>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { range: [1, 1.5, 2, 2.5, 3, 3.5], icon: Frown, label: "Poor" },
              { range: [4, 4.5, 5, 5.5, 6, 6.5], icon: Meh, label: "Okay" },
              { range: [7, 7.5, 8, 8.5], icon: Smile, label: "Good" },
              { range: [9, 9.5, 10], icon: Heart, label: "Excellent" }
            ].map(({ range, icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground font-semibold">{label}</span>
                <div className="flex flex-wrap gap-1 justify-center max-w-[200px]">
                  {range.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setEmojiRating(rating)}
                      className={cn(
                        "p-2 rounded-lg border-2 transition-all hover:scale-110 relative",
                        rating === emojiRating
                          ? `${getBgColor(rating)} border-opacity-50`
                          : "border-muted"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5",
                          rating === emojiRating ? getRatingColor(rating) : "text-muted-foreground"
                        )}
                      />
                      <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-background rounded-full px-1">
                        {rating}
                      </span>
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
        <h3 className="font-semibold mb-4">5. Grouped Range Selector (With half points)</h3>
        <div className="flex flex-col items-center gap-4">
          <span className={`text-4xl font-bold ${getRatingColor(segmentRating)}`}>
            {segmentRating.toFixed(1)}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
            {[
              { range: [1, 1.5, 2, 2.5, 3, 3.5], label: "Poor", color: "bg-rating-poor" },
              { range: [4, 4.5, 5, 5.5, 6, 6.5], label: "Okay", color: "bg-rating-okay" },
              { range: [7, 7.5, 8, 8.5], label: "Good", color: "bg-rating-good" },
              { range: [9, 9.5, 10], label: "Excellent", color: "bg-rating-excellent" }
            ].map(({ range, label, color }) => (
              <div key={label} className="space-y-2">
                <div className={`${color} bg-opacity-10 rounded-lg p-3 text-center border-2 ${color} border-opacity-30`}>
                  <div className="text-sm font-semibold mb-2">{label}</div>
                  <div className="grid grid-cols-3 gap-1">
                    {range.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSegmentRating(rating)}
                        className={cn(
                          "h-9 px-1 rounded-lg font-bold text-xs transition-all",
                          rating === segmentRating
                            ? `${color} text-white shadow-lg scale-105`
                            : "bg-background hover:bg-muted"
                        )}
                      >
                        {rating.toFixed(1)}
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