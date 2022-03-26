import {
  FormEvent,
  useRef,
  useState
} from 'react';
import { COMMENTS_LENGTH } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import {
  newCommentAction
} from '../../store/api-actions';
import { getCurrentOffer } from '../../store/data/selectors';
import { CommentDataWithOfferId } from '../../types/comments';
import Star from '../star/star';

function FormComments(): JSX.Element {
  const currentOffer = useAppSelector(getCurrentOffer);
  const [rating, setRating] = useState(0);
  const comment = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (commentData: CommentDataWithOfferId) => {
    dispatch(newCommentAction(commentData));
    setRating(0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating !== 0 && comment.current !== null && currentOffer !== null) {
      onSubmit({
        comment: comment.current.value,
        rating: rating,
        id: currentOffer.id,
      });
    }
    event.currentTarget.reset();
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit}
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
        ref={comment}
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        minLength={COMMENTS_LENGTH.MIN}
        maxLength={COMMENTS_LENGTH.MAX}
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
