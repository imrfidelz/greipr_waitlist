import { Star, Trash2, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Review } from '@/services/reviewService';

interface ReviewCardProps {
  review: Review;
  canEdit?: boolean;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
}

const ReviewCard = ({ review, canEdit = false, onEdit, onDelete }: ReviewCardProps) => {
  const displayName = review.isAnonymous ? 'Anonymous' : review.reviewer.name;
  const initials = review.isAnonymous ? 'A' : review.reviewer.name.charAt(0).toUpperCase();

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-card hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <Avatar className="h-10 w-10">
            {!review.isAnonymous && review.reviewer.image && (
              <AvatarImage src={review.reviewer.image} alt={displayName} />
            )}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm">{displayName}</h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {canEdit && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit?.(review)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete?.(review._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {review.comment && (
        <p className="text-sm text-foreground/90 leading-relaxed">
          {review.comment}
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
