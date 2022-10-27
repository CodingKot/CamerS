import {Review} from '../../types/review';
import Rating from '../rating/rating';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type ReviewCardProps = {
  review: Review;
}

function ReviewCard ({review}: ReviewCardProps): JSX.Element {

  dayjs.extend(localizedFormat);

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{
          dayjs(review.createAt).locale('ru').format('D MMMM')
        }
        </time>
      </div>
      <Rating rating={review.rating} className='review-card__rate'/>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
