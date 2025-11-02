import { useState, useEffect } from 'react';
import { Star, AlertCircle } from 'lucide-react';
import ReviewCard from './ReviewCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Review } from '@/services/reviewService';

interface ReviewsListProps {
  reviews: Review[];
  loading?: boolean;
  error?: string;
  currentUserId?: string;
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => void;
}

const ReviewsList = ({
  reviews,
  loading = false,
  error,
  currentUserId,
  onEditReview,
  onDeleteReview
}: ReviewsListProps) => {
  const [stats, setStats] = useState({
    average: 0,
    total: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.length;
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      const average = sum / total;

      const distribution = reviews.reduce((acc, r) => {
        acc[r.rating as keyof typeof acc] = (acc[r.rating as keyof typeof acc] || 0) + 1;
        return acc;
      }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

      setStats({ average, total, distribution });
    }
  }, [reviews]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg border-dashed">
        <Star className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="font-semibold text-lg mb-1">No Reviews Yet</h3>
        <p className="text-sm text-muted-foreground">
          Be the first to leave a review
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Statistics */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{stats.average.toFixed(1)}</span>
              <span className="text-muted-foreground">out of 5</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(stats.average) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {stats.total} {stats.total === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-1 min-w-[180px]">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs w-6">{rating} ★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{
                      width: `${stats.total > 0 ? (stats.distribution[rating as keyof typeof stats.distribution] / stats.total) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-6 text-right">
                  {stats.distribution[rating as keyof typeof stats.distribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            canEdit={currentUserId === review.reviewer._id}
            onEdit={onEditReview}
            onDelete={onDeleteReview}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
