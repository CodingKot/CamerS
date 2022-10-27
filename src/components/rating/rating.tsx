import {STARS_COUNT} from '../../const';
import Star from '../star/star';

type RatingProps = {
  rating: number;
  reviewCount?: number;
  className: string;
}

function Rating ({rating, reviewCount, className}: RatingProps): JSX.Element {
  return (
    <div className={`rate ${className}`}>
      {Array.from({length: STARS_COUNT}, (item, index) => index + 1)
        .map((item) => {
          if(item <= rating) {
            return (
              <Star xlinkHref="#icon-full-star" key={`${item}-star`}/>
            );
          }
          return (
            <Star xlinkHref="#icon-star" key={`${item}-star`}/>
          );
        })}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
    </div>
  );
}

export default Rating;
