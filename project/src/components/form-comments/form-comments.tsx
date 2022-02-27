import { FormEvent, useState } from 'react';
import Star from '../star/star';

function FormComments(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const fieldChangeHandler = (event: { target: { value: string; }; }) => {
    const {value} = event.target;
    setComment(value);
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        // eslint-disable-next-line no-console
        console.log(rating, '------', comment);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <Star
            key={star}
            star={star}
            setRating={setRating}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={fieldChangeHandler}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" >Submit</button>
      </div>
    </form>
  );
}

export default FormComments;
