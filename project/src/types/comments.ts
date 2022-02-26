import { Host } from './offer';

export type Comments = {
  id: number;
  user: Host;
  rating: number;
  comment: string;
  date: string;
}
