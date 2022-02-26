import { Comments } from '../../types/comments';
import FormComments from '../form-comments/form-comments';

type PropsType = {
  comments: Comments[];
}

function RoomReviews({comments}: PropsType): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">1</span></h2>
      {comments.map(({user, rating, comment, date, id}) => (
        <ul className="reviews__list" key={id}>
          <li className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width={54} height={54} alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: `${rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {comment}
              </p>
              <time className="reviews__time" dateTime={date}>{date.slice(0, 10)}</time>{/* todo format date */}
            </div>
          </li>
        </ul>
      ))}
      <FormComments />
    </section>
  );
}

export default RoomReviews;
