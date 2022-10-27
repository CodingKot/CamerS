import { Camera } from '../../types/camera';
import {AppRoute} from '../../const';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Rating from '../rating/rating';

type ProductCardProps = {
  camera: Camera;
  activeClassName?: string;
}

function CameraCard ({camera, activeClassName}: ProductCardProps): JSX.Element {
  const detailsLink = generatePath(AppRoute.Product, {id: `${camera.id}`});
  const navigate = useNavigate();
  return (
    <div className={`product-card ${activeClassName ?? ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImg2x} 2x`}/><img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <Rating rating={camera.rating} reviewCount={camera.reviewCount} className='product-card__rate'/>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={detailsLink} onClick={() => {
          window.scrollTo({top: 0});
          navigate(`../${camera.id}`);
        }}
        >Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CameraCard;
