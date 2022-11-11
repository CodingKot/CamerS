import {generatePath, Link} from 'react-router-dom';
import { AppRoute, Query, TabControl } from '../../const';
import {Promo} from '../../types/promo';


type BannerProps = {
  banner: Promo;
}

function Banner ({banner}: BannerProps): JSX.Element {
  const detailsLink = generatePath(AppRoute.Product, {id: `${banner?.id}`});

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${banner.previewImgWebp ?? ''}, ${banner.previewImgWebp2x ?? ''} 2x`}/><img src={banner.previewImg} srcSet="img/content/banner-bg@2x.jpg 2x" width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{banner?.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={{pathname: detailsLink, search: `?${Query.Tab}=${TabControl.Description}`}}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
