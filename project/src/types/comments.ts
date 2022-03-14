import { Host } from './offer';

export type Comments = {
  id: number;
  user: Host;
  rating: number;
  comment: string;
  date: string;
}

export type CommentData = {
  comment: string;
  rating: number;
}

export type CommentDataWithOfferId = {
  comment: string;
  rating: number;
  id: number;
}
