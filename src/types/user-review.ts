import { Review } from './review';

export type UserReview = Omit<Review, 'id' | 'createAt'>;
