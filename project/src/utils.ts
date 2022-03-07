import { Offer } from './types/offer';

function firstLetterToUpperCase(string : string) : string {
  return string[0].toUpperCase() + string.substring(1);
}

export default firstLetterToUpperCase;

export const sortPriceToHigh = (prev: Offer, next: Offer) => prev.price - next.price;
export const sortPriceToLow = (prev: Offer, next: Offer) => prev.price + next.price;
export const sortRatingToHigh = (prev: Offer, next: Offer) => next.rating - prev.rating;
