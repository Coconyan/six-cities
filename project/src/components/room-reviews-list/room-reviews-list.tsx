import { Comments } from '../../types/comments';
import FormComments from '../form-comments/form-comments';
import RoomReview from '../room-review/room-review';

type PropsType = {
  comments: Comments[];
}

function RoomReviewsList({ comments }: PropsType): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map(({ user, rating, comment, date, id }) => (
          <RoomReview
            key={id}
            user={user}
            rating={rating}
            comment={comment}
            date={date}
            id={id}
          />
        ))}
      </ul>
      <FormComments />
    </section>
  );
}

export default RoomReviewsList;