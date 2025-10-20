import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, Trash2, Calendar, MapPin, Users } from "lucide-react";

// Mock data for demonstration
const mockReviews = [
  {
    id: "1",
    recipeName: "Pago Pago Punch",
    rating: 8.0,
    dateMade: "8/11/2022",
    notes: "Good!",
    dateCreated: "10/20/2025",
  },
  {
    id: "2",
    recipeName: "Ancient Mariner",
    rating: 5.0,
    dateMade: "8/7/2022",
    notes: "Total Tiki recipe.",
    dateCreated: "10/20/2025",
  },
  {
    id: "3",
    recipeName: "Doctor Funk",
    rating: 5.0,
    dateMade: "8/6/2022",
    notes: "Used the Total Tiki recipe.",
    dateCreated: "10/20/2025",
  },
];

const ReviewList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "bg-rating-excellent text-white";
    if (rating >= 7) return "bg-rating-good text-white";
    if (rating >= 5) return "bg-rating-okay text-white";
    return "bg-rating-poor text-white";
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 9) return "Excellent";
    if (rating >= 7) return "Good";
    if (rating >= 5) return "Okay";
    return "Needs Work";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">Reviews ({mockReviews.length} total)</h2>
          <p className="text-sm text-muted-foreground mt-1">Search, sort, and manage your cocktail reviews</p>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, notes, venue, occasion..."
            className="pl-10 h-11 border-2"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px] h-11 border-2">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateAdded">Date Added</SelectItem>
            <SelectItem value="dateMade">Date Made</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-4">
        {mockReviews.map((review) => (
          <Card key={review.id} className="p-5 hover:shadow-lg transition-all border-2 hover:border-primary/30">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Rating Badge */}
              <div className={`flex-shrink-0 w-20 h-20 rounded-xl ${getRatingColor(review.rating)} flex flex-col items-center justify-center shadow-md`}>
                <div className="text-2xl font-bold">{review.rating.toFixed(1)}</div>
                <div className="text-xs opacity-90">/10</div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {review.recipeName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{review.dateMade}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {getRatingBadge(review.rating)}
                      </Badge>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Notes */}
                {review.notes && (
                  <p className="text-sm text-foreground/80 mb-2 line-clamp-2">
                    {review.notes}
                  </p>
                )}

                {/* Footer Meta */}
                <div className="text-xs text-muted-foreground">
                  Added: {review.dateCreated}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockReviews.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No reviews found</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
