import { ChangeEvent } from 'react';

type PropsType = {
  star: number;
  setRating: (offer: number) => void;
}

function Star({star, setRating}: PropsType) {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={star} id={`${star}-stars`} type="radio" required onChange={({target}: ChangeEvent<HTMLInputElement>) => setRating(Number(target.value))} />
      <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default Star;
